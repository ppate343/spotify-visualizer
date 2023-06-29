import { useState, useEffect } from 'react';
import { getCurrentUserProfile, getCurrentUserPlaylists, getTopArtists } from '../spotify';
import { StyledHeader } from '../styles';
import StyledGrid from '../styles/StyledGrid';
import ArtistsGrid from '../components/ArtistsGrid';
import SectionWrapper from '../components/SectionWrapper';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [playlists, setPlaylists] = useState(null);
    const [topArtists, setTopArtists] = useState(null)

    useEffect(() => {


        //getCurrentuserProfile returns a promise -> use a try and catch
        const fetchData = async () => {
            try {
                const userProfile = await getCurrentUserProfile();
                setProfile(userProfile.data);

                const userPlaylists = await getCurrentUserPlaylists();
                setPlaylists(userPlaylists.data);

                const userTopArtists = await getTopArtists();
                setTopArtists(userTopArtists.data);

                console.log(topArtists)

            } catch (e) {
                console.error(e);
            }
        };
        fetchData();

    }, []);



    return (
        <>
            {profile && (
                <>
                    <StyledHeader type="user">
                        <div className="header__inner">
                            {profile.images.length && profile.images[0].url && (
                                <img className="header__img" src={profile.images[0].url} alt="Avatar" />
                            )}
                            <div>
                                <div className="header__overline">Profile</div>
                                <h1 className="header__name">{profile.display_name}</h1>
                                <p className="header__meta">
                                    {playlists && (
                                        <span>{playlists.total} Playlist{playlists.total !== 1 ? 's' : ''}</span>
                                    )}
                                    <span>
                                        {profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </StyledHeader>
                    {topArtists && (
                        <main>
                            <SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
                                <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
                            </SectionWrapper>
                        </main>
                    )}

                </>
            )}
        </>
    )
};

export default Profile; 
