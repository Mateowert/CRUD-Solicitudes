import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import PrimaryButton from "@/Components/PrimaryButton";

export const Solicitud = ({ type, departamentos }) => {
    const { data, setData, post, reset, errors, patch } = useForm({
        fk_id_trabajador: "",
        fk_id_solicitante: "",
        fk_id_solicitado: "",
    });

    const [trabajadores, setTrabajadores] = useState([]);

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

        if (data.fk_id_solicitante) fetchData();
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

    const fetchData = async () => {
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
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e);
    }

    return (
        <form onSubmit={handleSubmit} >
            <div className="grid grid-cols-1 gap-2">
                <div className="">
                    <label htmlFor="">Area Solicitante</label>
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
                    <label htmlFor="">Area Solicitada</label>
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
                    <label htmlFor="">Trabajador</label>
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
            </div>

            <PrimaryButton className="mt-1">Enviar</PrimaryButton>
        </form>
    );
};
