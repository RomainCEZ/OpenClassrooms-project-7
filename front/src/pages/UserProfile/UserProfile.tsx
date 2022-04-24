import { useContext, useEffect } from "react";
import { SessionContext } from "../Auth/context/SessionContext";
import ProfilePictureBox from "./ProfilePictureBox";
import UserContent from "./UserContent";
import UserInfos from "./UserInfos";
import UserProfileSecurity from "./UserProfileSecurity";

export default function UserProfile() {
    const { user, checkLogin } = useContext(SessionContext);
    const date = new Date(user.timestamp);
    const avatar = "";

    useEffect(() => {
        checkLogin();
    }, []);

    const months = {
        1: "Janvier",
        2: "Février",
        3: "Mars",
        4: "Avril",
        5: "Mai",
        6: "Juin",
        7: "Juillet",
        8: "Août",
        9: "Septembre",
        10: "Octobre",
        11: "Novembre",
        12: "Décembre",
    };

    const accountCreationDate = `${date.getDate()} ${
        months[date.getMonth()]
    } ${date.getFullYear()}`;

    return (
        <section className="relative flex flex-col items-center bg-white w-full border border-blue-800 sm:rounded-xl overflow-clip shadow-lg">
            <div className="absolute w-full h-36 bg-blue-800 shadow-md"></div>
            <ProfilePictureBox avatar={avatar} />
            <div className="flex flex-col font-bold justify-center py-6 px-3 sm:px-6 pt-0 w-full bg-white divide-blue-800 divide-y">
                <div className="p-4 mb-2">
                    <p className="mb-2 text-center text-4xl text-blue-800">
                        {user.username}
                    </p>
                    <p className="text-center">
                        Depuis le {accountCreationDate}
                    </p>
                </div>
                <UserContent />
                <UserInfos />
                <UserProfileSecurity />
            </div>
        </section>
    );
}
