import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import PrimaryButton from "@/Components/PrimaryButton";

export const Solicitud = ({ type }) => {
    const { data, setData, post, reset, errors, patch } = useForm({
        fk_id_trabajador: "",
        fk_id_solicitante: "",
        fk_id_solicitado: "",
        fecha_elaboracion: null,
        fecha_revision: null,
        folio: "",
        descripcion: "",
        fk_id_tipo: "",
    });

    //tipo: codigo y norma
    const [tipos, setTipos] = useState([]);

    // fechas cambiar por funciones y mover directamente al form
    const [date_e, setDate_e] = useState("");
    useEffect(() => {
        setData("fecha_elaboracion", date_e.toString);
    }, [date_e]);
    const [date_r, setDate_r] = useState("");
    useEffect(() => {
        setData("fecha_revision", date_r.toString);
    }, [date_r]);

    const [trabajadores, setTrabajadores] = useState([]);

    const [departamentos, setDepartamentos] = useState([]);

    useEffect(() => {
        fetchData();
        setSolicitables(departamentos.filter((d) => d.solicitable === 1));
        setSolicitantes(departamentos);
    }, [departamentos]);

    const [solicitables, setSolicitables] = useState(
        departamentos.filter((d) => d.solicitable === 1)
    );
    const [solicitantes, setSolicitantes] = useState(departamentos);

    useEffect(() => {
        setSolicitables(
            departamentos.filter(
                (d) => d.id != data.fk_id_solicitante && d.solicitable === 1
            )
        );
        if (data.fk_id_solicitado === data.fk_id_solicitante) {
            setData("fk_id_solicitado", "");
        }

        if (data.fk_id_solicitante) fetchTrabajadores();
        setData("fk_id_trabajador", "");
    }, [data.fk_id_solicitante]);

    useEffect(() => {
        setSolicitantes(
            departamentos.filter((d) => d.id != data.fk_id_solicitado)
        );
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
        } catch (error) {
            console.log("error", error);
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-2">
                <div className="">
                    <Label htmlFor="">Area Solicitante</Label>
                    <Select
                        value={data.fk_id_solicitante}
                        onValueChange={(e) => setData("fk_id_solicitante", e)}
                        disabled={solicitantes.length == 0}
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
                    <Label htmlFor="">Area Solicitada</Label>
                    <Select
                        value={data.fk_id_solicitado}
                        onValueChange={(e) => setData("fk_id_solicitado", e)}
                        disabled={!solicitables.length}
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
                    <Label htmlFor="">Trabajador</Label>
                    <Select
                        value={data.fk_id_trabajador}
                        onValueChange={(e) => setData("fk_id_trabajador", e)}
                        disabled={!trabajadores.length}
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
                    <Label htmlFor="">Folio</Label>
                    <Input placeholder="Folio" />
                </div>

                <div>
                    <Label htmlFor="">Codigo y Norma</Label>
                    <Select
                        value={data.fk_id_tipo}
                        onValueChange={(e) => setData("fk_id_tipo", e)}
                        disabled={!tipos.length}
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
                    <Label className="mr-4">Fecha de Elaboración:</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                data-empty={!date_e}
                                className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                            >
                                <CalendarIcon />
                                {date_e ? (
                                    format(date_e, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date_e}
                                onSelect={setDate_e}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div>
                    <Label className="mr-4">Fecha de Revisión:</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                data-empty={!date_r}
                                className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                            >
                                <CalendarIcon />
                                {date_r ? (
                                    format(date_r, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date_r}
                                onSelect={setDate_r}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div>
                <Label htmlFor="">Descripción</Label>
                <Textarea placeholder="Descripción del servicio solicitado o falla a reparar:" />
            </div>

            <PrimaryButton className="mt-1">Enviar</PrimaryButton>
        </form>
    );
};
