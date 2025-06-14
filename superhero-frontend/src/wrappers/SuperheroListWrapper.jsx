import { useNavigate } from 'react-router-dom';
import SuperheroList from "@/components/SuperheroList";

export default function SuperheroListWrapper() {
    const navigate = useNavigate();

    return (
        <SuperheroList
            onView={(id) => navigate(`/hero/${id}`)}
            onEdit={(id) => navigate(`/form/${id}`)}
            onAdd={() => navigate('/form')}
        />
    );
}
