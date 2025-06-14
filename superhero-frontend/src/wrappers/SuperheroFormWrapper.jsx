import { useParams, useNavigate } from 'react-router-dom';
import SuperheroForm from "@/components/SuperheroForm";

export default function SuperheroFormWrapper() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <SuperheroForm
            id={id || null}
            onBack={() => navigate('/')}
            onSave={() => navigate('/')}
        />
    );
}
