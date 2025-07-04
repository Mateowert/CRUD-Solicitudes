import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import Loader from "@/components/ui/loader";

export const Solicitud = ({ type, id_solicitud, setOpen }) => {
    const { data, setData, post, reset, errors, patch } = useForm({
        fk_id_trabajador: "",
        fk_id_solicitante: "",
        fk_id_solicitado: "",
        fecha_elaboracion: "",
        fecha_revision: "",
        folio: "",
        descripcion: "",
        fk_id_tipo: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    //tipo: codigo y norma
    const [tipos, setTipos] = useState([]);

    //trabajadores del departamento
    const [trabajadores, setTrabajadores] = useState([]);

    //consulta a todos los departamentos
    const [departamentos, setDepartamentos] = useState([]);

    const [solicitud, setSolicitud] = useState([]);

    //seteo general
    useEffect(() => {
        fetchData();
    }, []);

    //departamentos solicitantes y solicitables
    const [solicitables, setSolicitables] = useState(
        departamentos.filter((d) => d.solicitable === 1)
    );
    const [solicitantes, setSolicitantes] = useState(departamentos);

    useEffect(() => {
        if (data.fk_id_solicitado === data.fk_id_solicitante) {
            setData("fk_id_solicitado", "");
        }

        if (data.fk_id_solicitante) fetchTrabajadores();
        if (type != "view") setData("fk_id_trabajador", "");
    }, [data.fk_id_solicitante]);

    useEffect(() => {
        if (data.fk_id_solicitado === data.fk_id_solicitante) {
            setData("fk_id_solicitante", "");
        }
    }, [data.fk_id_solicitado]);

    const fetchTrabajadores = async () => {
        if (data.fk_id_solicitante === "") return;
        try {
            const response = await fetch(
                `api/getTrabajadoresDepartamento/${data.fk_id_solicitante}`
            );
            const { dataTrabajadores } = await response.json();
            setTrabajadores(dataTrabajadores);

            if (id_solicitud)
                setData("fk_id_trabajador", solicitud.FK_Trabajador);
        } catch (error) {
            console.log("error", error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch("/api/getDepartamentos");

            const { departamentos } = await response.json();
            setDepartamentos(departamentos);

            const responseTipos = await fetch("/api/getTipos");
            const { tipos } = await responseTipos.json();
            setTipos(tipos);

            setSolicitables(departamentos.filter((d) => d.solicitable === 1));
            setSolicitantes(departamentos);

            if (id_solicitud) {
                fetchSolicitud();
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    const fetchSolicitud = async () => {
        if (!id_solicitud) return;

        try {
            setIsLoading(true);

            const response = await fetch(`solicitud/${id_solicitud}`);
            const { solicitud } = await response.json();
            setSolicitud(solicitud);

            setData("fk_id_solicitante", solicitud.FK_Departamento);
            setData("fk_id_solicitado", solicitud.FK_Departamento_solicitado);
            setData("folio", solicitud.folio);
            setData("descripcion", solicitud.descripcion);
            setData("fk_id_tipo", solicitud.FK_Tipo_solicitud);
            setData("fecha_elaboracion", solicitud.fecha_elaboracion);
            setData("fecha_revision", solicitud.fecha_revision);
        } catch (error) {
            console.log("error", error);
        }

        setIsLoading(false);
    };

    function openGetRoute(url, data) {
        const form = new FormData();

        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        form.append("_token", csrfToken);

        for (const key in data) {
            form.append(key, data[key]);
        }

        const newWindow = window.open("", "_blank");

        fetch(url, {
            method: "POST",
            body: form,
        })
            .then((response) => response.blob())
            .then((blob) => {
                const blobUrl = URL.createObjectURL(blob);
                newWindow.location.href = blobUrl;
            })
            .catch((error) => {
                toast({
                    description: "Ocurrio un error al imprimir el documento",
                    variant: "destructive",
                });
                newWindow.close();
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (type == "view") {
            openGetRoute("api/getSolicitudPDF", {id: id_solicitud} );
            return;
        }

        if (type == "edit" && id_solicitud) {
            patch(route("solicitud.update", id_solicitud), {
                onSuccess: () => {
                    setOpen(false);
                    toast("Editado con exito");
                },
            });
            return;
        }

        post(route("solicitud.store"), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast("Creado con exito");
            },
            onError: () => {
                console.log(errors);
            },
        });
    };

    return (
        <>
            {isLoading && (
                <div className="fixed items-center justify-center ml-60 mt-20">
                    <Loader />
                </div>
            )}
            <form onSubmit={handleSubmit} id="form_solicitud">
                <div className="grid grid-cols-1 gap-2">
                    <div className="">
                        <Label htmlFor={"select_solicitante"}>
                            Area Solicitante
                        </Label>
                        <Select
                            id="select_solicitante"
                            value={data.fk_id_solicitante}
                            onValueChange={(e) =>
                                setData("fk_id_solicitante", e)
                            }
                            disabled={
                                (solicitantes.length == 0) | (type == "view")
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Solicitante" />
                            </SelectTrigger>
                            <SelectContent>
                                {solicitantes.map((departamento) => (
                                    <SelectItem
                                        key={departamento.id}
                                        value={departamento.id.toString()}
                                    >
                                        {departamento.nombre_departamento}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.fk_id_solicitante && (
                            <InputError message={errors.fk_id_solicitante} />
                        )}
                    </div>

                    <div>
                        <Label htmlFor={"select_solicitado"}>
                            Area Solicitada
                        </Label>
                        <Select
                            id="select_solicitado"
                            value={data.fk_id_solicitado}
                            onValueChange={(e) =>
                                setData("fk_id_solicitado", e)
                            }
                            disabled={!solicitables.length || type == "view"}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Solicitado" />
                            </SelectTrigger>
                            <SelectContent>
                                {solicitables.map((departamento) => {
                                    return (
                                        <SelectItem
                                            key={departamento.id}
                                            value={departamento.id.toString()}
                                        >
                                            {departamento.nombre_departamento}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                        {errors.fk_id_solicitado && (
                            <InputError message={errors.fk_id_solicitado} />
                        )}
                    </div>

                    <div>
                        <Label htmlFor={"select_trabajador"}>Trabajador</Label>
                        <Select
                            id="select_trabajador"
                            value={data.fk_id_trabajador}
                            onValueChange={(e) =>
                                setData("fk_id_trabajador", e)
                            }
                            disabled={!trabajadores.length || type == "view"}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Trabajador" />
                            </SelectTrigger>
                            <SelectContent>
                                {trabajadores.map((trabajador) => {
                                    return (
                                        <SelectItem
                                            key={trabajador.id}
                                            value={trabajador.id.toString()}
                                        >
                                            {trabajador.nombre}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                        {errors.fk_id_trabajador && (
                            <InputError message={errors.fk_id_trabajador} />
                        )}
                    </div>

                    <div>
                        <Label htmlFor={"folio"}>Folio</Label>
                        <Input
                            id="folio"
                            placeholder="Folio"
                            value={data.folio}
                            onChange={(e) => setData("folio", e.target.value)}
                            disabled={type == "view"}
                        />
                        {errors.folio && <InputError message={errors.folio} />}
                    </div>

                    <div>
                        <Label htmlFor={"select_norma"}>Codigo y Norma</Label>
                        <Select
                            id="select_norma"
                            value={data.fk_id_tipo}
                            onValueChange={(e) => setData("fk_id_tipo", e)}
                            disabled={!tipos.length | (type == "view")}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Codigo y Norma" />
                            </SelectTrigger>
                            <SelectContent>
                                {tipos.map((tipo) => {
                                    return (
                                        <SelectItem
                                            key={tipo.id}
                                            value={tipo.id.toString()}
                                        >
                                            {tipo.codigo}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                        {errors.fk_id_tipo && (
                            <InputError message={errors.fk_id_tipo} />
                        )}
                    </div>

                    <div>
                        <Label htmlFor={"fecha_elaboracion"} className="mr-4">
                            Fecha de Elaboración:
                        </Label>
                        <Input
                            id="fecha_elaboracion"
                            type="date"
                            value={data.fecha_elaboracion}
                            onChange={(e) =>
                                setData("fecha_elaboracion", e.target.value)
                            }
                            disabled={type == "view"}
                        />
                        {errors.fecha_elaboracion && (
                            <InputError message={errors.fecha_elaboracion} />
                        )}
                    </div>

                    <div>
                        <Label htmlFor="descripcion">Descripción</Label>
                        <Textarea
                            id="descripcion"
                            placeholder="Descripción del servicio solicitado o falla a reparar:"
                            value={data.descripcion}
                            onChange={(e) =>
                                setData("descripcion", e.target.value)
                            }
                            disabled={type == "view"}
                        />
                        {errors.descripcion && (
                            <InputError message={errors.descripcion} />
                        )}
                    </div>
                </div>

                {type != "view" && (
                    <Button className="mt-3" type="submit">
                        Enviar
                    </Button>
                )}

                {type == "view" && <Button className="mt-3">PDF</Button>}
            </form>
        </>
    );
};
