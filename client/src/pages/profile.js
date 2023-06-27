import { useState, useEffect } from 'react';
import { getCurrentUserProfile } from '../spotify';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {


        //getCurrentuserProfile returns a promise -> use a try and catch
        const fetchData = async () => {
            try {
                const { data } = await getCurrentUserProfile();
                setProfile(data);
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();

    }, []);



    return (
        <>
            {profile && (
                <div>
                    <h1>{profile.display_name}</h1>
                    <p>{profile.followers.total} Followers</p>
                    {profile.images.length && profile.images[0].url && (
                        <img src={profile.images[0].url} alt="Avatar" />
                    )}

                </div>
            )}
        </>
    )
};

export default Profile; 
