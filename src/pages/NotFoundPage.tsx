import { useNavigate } from "react-router-dom"
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { NoSymbolIcon } from "@heroicons/react/16/solid"

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen flex items-center justify-center">
            <Card Icon={NoSymbolIcon} title="Page Not Found">
                <h2 className="text-center font-bold text-xl">
                    The page you are looking for does not exist.
                </h2>
                <div className="flex justify-center">
                    <Button onClick={() => navigate('/')}>
                        Home
                    </Button>
                </div>
            </Card>
        </main>
    )
}