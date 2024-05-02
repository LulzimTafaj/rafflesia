import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

export const SignOutButton = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
            showToast({ message: "Signed Out!", type: "SUCCESS"})
        },
        onError: () => {
            showToast({ message: "Issue signing out.", type: "ERROR"})
        }
    })

    const handleClick = () => {
        mutation.mutate();
    }

    return (
        <button onClick={handleClick} className="text-rose-600 px-4 py-1 font-bold bg-white hover:bg-gray-100 rounded-sm text-sm">Sign Out</button>
    )
}