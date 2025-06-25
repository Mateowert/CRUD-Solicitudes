import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog"

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
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"

import { Solicitud } from "@/Components/Solicitud"

import { Link } from '@inertiajs/react';

const IndexSolicitudes = ({ solicitudes }) => {
    return (
        <>
            <h1 className="text-center text-4xl font-extrabold text-blue-600 mt-8 mb-4">Solicitudes</h1>

            <div className="ml-20 mr-20">
                <div className="flex justify-end mb-5">
                    <Dialog>
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
                            <Solicitud type='create'/>
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
                            <TableHead className="w-[200px]">Fecha de Elaboración</TableHead>
                            <TableHead className="w-[300px]">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            solicitudes.map((item) => {
                                return <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.solicitado}</TableCell>
                                    <TableCell className="font-medium">{item.solicitante}</TableCell>
                                    <TableCell className="font-medium">{item.nombre}</TableCell>
                                    <TableCell className="font-medium">{item.fecha_elaboracion}</TableCell>
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
                                                <Solicitud type='view' id_solicitud={item.id}/>
                                            </DialogContent>
                                        </Dialog>
                                        <Dialog>
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
                                                <Solicitud type='edit' id_solicitud={item.id}/>
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
                                                    <AlertDialogTitle>¿Estas seguro de que quieres eliminar la solicitud?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        La solicitud se eliminara permanentemente
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction asChild>
                                                        <Link href={route('solicitud.destroy', item.id)} method="delete">Confirmar</Link>
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

export default IndexSolicitudes;