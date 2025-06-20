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

const IndexSolicitudes = ({departamentos}) => {
    const prueba = [
        {
            id: 1,
            'Solicitante': 'Norma Natalia',
            'Solicitado': 'Centro de Còmputo',
            'Fecha_elaboracion': '12/4/23'
        },
        {
            id: 2,
            'Solicitante': 'Asereje Jimenez',
            'Solicitado': 'Mantenimiento',
            'Fecha_elaboracion': '12/4/23'
        },
        {
            id: 3,
            'Solicitante': 'Nose Luna',
            'Solicitado': 'Recursos',
            'Fecha_elaboracion': '12/4/23'
        },
    ]

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
                            <Solicitud type='create' departamentos={departamentos}/>
                        </DialogContent>
                    </Dialog>
                </div>

                <Table>
                    <TableCaption>Listado de Solicitudes</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Solicitado</TableHead>
                            <TableHead>Solicitante</TableHead>
                            <TableHead className="w-[200px]">Fecha de Elaboración</TableHead>
                            <TableHead className="w-[300px]">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            prueba.map((item) => {
                                return <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.Solicitante}</TableCell>
                                    <TableCell className="font-medium">{item.Solicitado}</TableCell>
                                    <TableCell className="font-medium">{item.Fecha_elaboracion}</TableCell>
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
                                                <Solicitud type='view' departamentos={departamentos}/>
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
                                                <Solicitud type='edit' departamentos={departamentos}/>
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
                                                    <AlertDialogAction>
                                                        <a href="#">Confirmar</a>
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