import { useParams, useNavigate } from 'react-router-dom';
import SuperheroDetail from "@/components/SuperheroDetail";

export default function SuperheroDetailWrapper() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <SuperheroDetail
            id={id}
            onBack={() => navigate('/')}
            onEdit={(id) => navigate(`/form/${id}`)}
        />
    );
}
