import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div>
                <Button variant="contained" onClick={goBack}>Go Back</Button>
            </div>
        </section>
    )
}

export default Unauthorized