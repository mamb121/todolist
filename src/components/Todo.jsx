import { Card, CardContent,  Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";


export default function Todo({ todo ,showDelete,showEdit ,checkClick}) {

  return (
   

    <Card
      className="todoCard"
      sx={{
        minWidth: 275,
        background: "#283593",
        color: "white",
        marginTop: 5,
        textAlign:"left"
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h5" sx={{ textAlign: "left" ,textDecoration: todo.isCompleted ? "line-through":"none" }}>
              {todo.title}
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              {todo.details}
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={4}
            display="flex"
            justifyContent="space-around"
            alignContent="center"
            justifyItems="center"
          >
            <IconButton
              className="IconButton"
              aria-label="Check"
              onClick={()=>checkClick(todo)}
              sx={{
                color: todo.isCompleted?"white":"#8bc34a",
                background: todo.isCompleted?"#8bc34a":"white",
                border: "solid #8bc34a 3px",
              }}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              className="IconButton"
              aria-label="Edit"
              sx={{
                color: "#8bc34a",
                background: "white",
                border: "solid #8bc34a 3px",
              }}
              onClick={()=>{showEdit(todo)}}
            >
              <ModeEditOutlineOutlinedIcon />
            </IconButton>
            <IconButton
              className="IconButton"
              aria-label="Delete"
              sx={{
                color: "#b23c17",
                background: "white",
                border: "solid #b23c17 3px",
              }}
              onClick={()=>{showDelete(todo)}}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
