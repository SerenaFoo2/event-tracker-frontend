import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavBarLink } from '../../styles/Navigationbar';

export default function LoginButton() {
    return (
        <NavBarLink to="/login">
            <AccountCircleIcon aria-label="login">
                
            </AccountCircleIcon>

        </NavBarLink>
    )

}