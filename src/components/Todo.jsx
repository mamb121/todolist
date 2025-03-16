import { Button, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
export default function Todo({title,details}) {
  return (
    <Card
    className="todoCard"
      sx={{
        minWidth: 275,
        background: "#283593",
        color: "white",
        marginTop: 5,
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h5" sx={{ textAlign: "right" }}>
              {title}
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "right" }}>
            {details}
            </Typography>
          </Grid>
          <Grid container item xs={4} display="flex" justifyContent="space-around" alignContent="center" justifyItems="center" >
            <IconButton className="IconButton" aria-label="Check" sx={{color:"#8bc34a",background:"white",border:"solid #8bc34a 3px"}}>
              <CheckIcon />
            </IconButton>           
            <IconButton className="IconButton" aria-label="Edit" sx={{color:"#8bc34a",background:"white",border:"solid #8bc34a 3px"}}>
              <ModeEditOutlineOutlinedIcon />
            </IconButton>
            <IconButton className="IconButton" aria-label="Delete" sx={{color:"#b23c17",background:"white",border:"solid #b23c17 3px"}}>
              <DeleteIcon />
            </IconButton>        
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
