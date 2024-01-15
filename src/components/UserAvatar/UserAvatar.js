
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUserData } from "redux/auth.selector";
import { changeAvatarThunk } from "redux/authSlice";




export const UserAvatar = () => {
    const { avatarURL } = useSelector(selectAuthUserData);
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('avatar', file);
        dispatch(changeAvatarThunk(formData))
        
    }

    const handleAvatarClick = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div>
            <img
                src={avatarURL}
                height={100}
                width={100}
                alt="avatar"
                style={{ cursor: 'pointer' }}
                onClick={handleAvatarClick}/>
            <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}/>
        </div>
    )
}