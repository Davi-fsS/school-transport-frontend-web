import { Link } from "@mui/material";

export const schoolColumns = [
    { field: 'name', headerName: 'Nome', flex: 1},
    { field: 'address', headerName: 'Endereço', flex: 1 },
    { field: 'city', headerName: 'Cidade', flex: 1 },
    { field: 'state', headerName: 'Estado', flex: 1 },
    { field: 'neighborhood', headerName: 'Bairro', flex: 1 },
    { field: 'description', headerName: 'Descrição', flex: 1 },
    {
        field: 'local',
        headerName: "Local",
        flex: 1,
        renderCell: (params) => {
            const { lat, lng } = params.row;
            const googleMapsUrl = `http://maps.google.com/maps?z=12&t=m&q=loc:${lat}+${lng}`;
            return (
                <Link href={googleMapsUrl} target="_blank" rel="noopener">
                    Ver no Mapa
                </Link>
            );
        },
    },
];

export const deviceColumns = [
    { field: 'name', headerName: 'Nome', flex: 1},
    { field: 'code', headerName: 'Código', flex: 1 },
    { field: 'driver', headerName: 'Motorista Associado', flex: 1 },
    { field: 'creation_date', headerName: 'Data de Criação', flex: 1 }
];

export const vehicleColumns = [
    { field: 'plate', headerName: 'Placa', flex: 1},
    { field: 'model', headerName: 'Modelo', flex: 1 },
    { field: 'color', headerName: 'Cor', flex: 1 },
    { field: 'year', headerName: 'Ano', flex: 1 },
    { field: 'user_name', headerName: 'Usuário', flex: 1 },
];

export const driverColumns = [
    { field: 'name', headerName: 'Nome', flex: 1},
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'cnh', headerName: 'CNH', flex: 1 },
    { field: 'cpf', headerName: 'CPF', flex: 1 },
    { field: 'rg', headerName: 'RG', flex: 1 },
];