import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import { Solicitud } from "@/Components/Solicitud";

import { Link } from "@inertiajs/react";
import { useState } from "react";

import { Toaster } from "@/components/ui/sonner"
import { SolicitudColumna } from "@/Components/SolicitudColumna";

const IndexSolicitudes = ({ solicitudes }) => {
    const [dialogCrear, setDialogCrear] = useState(false);
    return (
        <>
            <Toaster position="top-center" />

            <h1 className="text-center text-4xl font-extrabold text-blue-600 mt-8 mb-4">
                Solicitudes
            </h1>

            <div className="ml-20 mr-20">
                <div className="flex justify-end mb-5">
                    <Dialog open={dialogCrear} onOpenChange={setDialogCrear}>
                        <DialogTrigger>
                            <span className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded shadow">
                                + Crear
                            </span>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Crear Solicitud</DialogTitle>
                            <DialogDescription>
                                Crea una nueva solicitud
                            </DialogDescription>
                            <Solicitud type="create" setOpen={setDialogCrear}/>
                        </DialogContent>
                    </Dialog>
                </div>

                <Table>
                    <TableCaption>Listado de Solicitudes</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Solicitado</TableHead>
                            <TableHead>Solicitante</TableHead>
                            <TableHead>Nombre Solicitante</TableHead>
                            <TableHead className="w-[200px]">
                                Fecha de Elaboración
                            </TableHead>
                            <TableHead className="w-[300px]">
                                Acciones
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {solicitudes.map((item) => {
                            return (
                                <SolicitudColumna key={item.id} item={item} />
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default IndexSolicitudes;
