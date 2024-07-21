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