import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

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

import PrimaryButton from "@/Components/PrimaryButton";

export const Solicitud = ({ type, id_solicitud }) => {
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
    };

    function handleSubmit(e) {
        e.preventDefault();

        if (type == "edit" && id_solicitud) {
            patch(route("solicitud.update", id_solicitud), {
                onSuccess: () => {
                    reset();
                },
                onFinish: () => console.log("si se actualizo"),
            });
            return;
        }

        post(route("solicitud.store"), {
            onSuccess: () => {
                reset();
                console.log("se guardo");
            },
            onError: () => {
                console.log("algo trono guardando");
            },
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-2">
                <div className="">
                    <Label htmlFor={"select_solicitante"}>
                        Area Solicitante
                    </Label>
                    <Select
                        id="select_solicitante"
                        value={data.fk_id_solicitante}
                        onValueChange={(e) => setData("fk_id_solicitante", e)}
                        disabled={(solicitantes.length == 0) | (type == "view")}
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
                </div>

                <div>
                    <Label htmlFor={"select_solicitado"}>Area Solicitada</Label>
                    <Select
                        id="select_solicitado"
                        value={data.fk_id_solicitado}
                        onValueChange={(e) => setData("fk_id_solicitado", e)}
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
                </div>

                <div>
                    <Label htmlFor={"select_trabajador"}>Trabajador</Label>
                    <Select
                        id="select_trabajador"
                        value={data.fk_id_trabajador}
                        onValueChange={(e) => setData("fk_id_trabajador", e)}
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
                </div>

                <div>
                    <Label htmlFor={"fecha_revision"} className="mr-4">
                        Fecha de Revisión:
                    </Label>
                    <Input
                        id="fecha_revision"
                        type="date"
                        value={data.fecha_revision}
                        onChange={(e) =>
                            setData("fecha_revision", e.target.value)
                        }
                        disabled={type == "view"}
                    />
                </div>

                <div>
                    <Label htmlFor="descripcion">Descripción</Label>
                    <Textarea
                        id="descripcion"
                        placeholder="Descripción del servicio solicitado o falla a reparar:"
                        value={data.descripcion}
                        onChange={(e) => setData("descripcion", e.target.value)}
                        disabled={type == "view"}
                    />
                </div>
            </div>

            {type != "view" && (
                <PrimaryButton className="mt-3">Enviar</PrimaryButton>
            )}
        </form>
    );
};
