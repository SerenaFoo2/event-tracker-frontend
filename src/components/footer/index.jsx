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
    <FooterContainer>
      <Grid container spacing={2} justifyContent="center">
        <Grid item sm={12} md={6}>
          <FooterTitle>About Us</FooterTitle>
          <Typography variant="caption" component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris a
            diam maecenas sed enim ut.
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
