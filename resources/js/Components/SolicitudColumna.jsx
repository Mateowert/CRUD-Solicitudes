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

import { Solicitud } from "@/Components/Solicitud";

import { Link } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export const SolicitudColumna = ({item}) => {
    const [dialogEditar, setDialogEditar] = useState(false);
    return (
        <TableRow key={item.id}>
            <TableCell className="font-medium">{item.solicitado}</TableCell>
            <TableCell className="font-medium">{item.solicitante}</TableCell>
            <TableCell className="font-medium">{item.nombre}</TableCell>
            <TableCell className="font-medium">
                {item.fecha_elaboracion}
            </TableCell>
            <TableCell className="font-medium">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="mr-2">
                            Ver
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Ver Solicitud</DialogTitle>
                        <DialogDescription>
                            Ver el contenido de una solicitud
                        </DialogDescription>
                        <Solicitud type="view" id_solicitud={item.id} />
                    </DialogContent>
                </Dialog>

                <Dialog open={dialogEditar} onOpenChange={setDialogEditar}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="mr-2">
                            Editar
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Editar Solicitud</DialogTitle>
                        <DialogDescription>
                            Editar el contenido de una solicitud
                        </DialogDescription>
                        <Solicitud
                            type="edit"
                            id_solicitud={item.id}
                            setOpen={setDialogEditar}
                        />
                    </DialogContent>
                </Dialog>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" className="mr-2">
                            Eliminar
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                ¿Estas seguro de que quieres eliminar la
                                solicitud?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                La solicitud se eliminara permanentemente
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Link
                                    href={route("solicitud.destroy", item.id)}
                                    method="delete"
                                >
                                    Confirmar
                                </Link>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </TableCell>
        </TableRow>
    );
};
