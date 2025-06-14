import { useUser } from "../UserContext";

function Dashboard() {

    const {user, loading} = useUser();
 
    if (loading) {
        return <p className="text-gray-500">Loading user...</p>
    }

    if (!user) {
        return <p className="text-red-500">Not logged in</p>
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-indigo-800">Welcome, {user.email}!</h2>
        </div>
    );
}
export default Dashboard;