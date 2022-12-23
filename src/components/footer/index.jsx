import {
  FooterContainer,
  FooterLink,
  FooterText,
  FooterTitle,
  GridItemContainer,
  ListContainer,
} from "../../styles/footer";
import {
  Box,
  Grid,
  ListItemText,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <FooterContainer style={{ background: "#850000" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item sm={12} md={6}>
          <FooterTitle fontSize="100">About Us</FooterTitle>
          <Typography variant="caption" component="p">
            Watch WAT? Don't know where to head this weekend? No problem. WATch!
            delivers a cuarted list of the most exiting events, tailored just
            for you. Track all your favorite shows and events, ranging from
            concerts, musicals, theatre and arts. It's time to discover a new
            side to your city, right in the palm of your hand.
            <br></br>
            <br></br>
            We believe in giving back and helping the local arts scene grow by
            promoting local shows and talents, and enabling consumers to
            discover, engage and consume our digital and live experiences via
            WATch!.
          </Typography>
        </Grid>

        <GridItemContainer item sm={6} md={3}>
          <FooterTitle>My Account</FooterTitle>
          <ListContainer>
            <ListItemText>
              <FooterLink to="/login">
                <FooterText>Login</FooterText>
              </FooterLink>
            </ListItemText>
            <ListItemText>
              <FooterLink to="/myEvents">
                <FooterText>My Events</FooterText>
              </FooterLink>
            </ListItemText>
            <ListItemText>
              <FooterLink to="/signUp">
                <FooterText>Create Account</FooterText>
              </FooterLink>
            </ListItemText>
          </ListContainer>
        </GridItemContainer>

        <GridItemContainer item sm={6} md={3}>
          <FooterTitle>Follow us on</FooterTitle>
          <ListContainer>
            <ListItemText>
              <FooterText>Serena Foo: </FooterText>
              <Box sx={{ my: 0, display: "flex", gap: 2 }}>
                <IconButton
                  aria-label="Serene's GitHub Url"
                  href="https://github.com/SerenaFoo2/event-tracker-frontend"
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton
                  aria-label="Serene's LinkedIn Url"
                  href="https://www.linkedin.com/in/serena-foo-0b19b2227/"
                >
                  <LinkedInIcon />
                </IconButton>
                <Tooltip title="serena_dango@hotmail.com">
                  <IconButton>
                    <EmailIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItemText>
            <ListItemText>
              <FooterText>Hong Yuan: </FooterText>
              <Box sx={{ my: 0, display: "flex", gap: 2 }}>
                <IconButton
                  aria-label="Hong Yuan's GitHub Url"
                  href="https://github.com/hongyuanloo/event-tracker-backend"
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton
                  aria-label="Hong Yuan's LinkedIn Url"
                  href="https://www.linkedin.com/in/hong-yuan-loo-815944a2/"
                >
                  <LinkedInIcon />
                </IconButton>
                <Tooltip title="loohongyuan5505@hotmail.com">
                  <IconButton>
                    <EmailIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItemText>
          </ListContainer>
        </GridItemContainer>
      </Grid>
    </FooterContainer>
  );
}
