import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import './App.css';
import { useForm } from 'react-hook-form';
import MaterialDatatable from "material-datatable";
import axios from 'axios';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import StorageIcon from '@material-ui/icons/Storage';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyle = makeStyles({
  inputForm: {
    marginRight: '10px',
    marginLeft: '10px',
    height: '35px',
    width: '200px',
    borderRadius: '5px 5px 5px 5px',
    borderColor: '#cecece',
    textAlign: 'center'
  },
  botonRegistrar: {
    background: '#2c2c2c',
    padding: '1%'
  },
  tabla:{
    maxWidth:'90%',
    marginLeft: 'auto',
    marginRight: 'auto'
  }

})

export default function App() {
  const { register, handleSubmit, errors } = useForm();
  console.log(errors);

  const [item, setItem] = useState([]);
  const classes = useStyle();

  const columns = [{
    name: "Nombre",
    field: "nombre",
    options: {
      filter: true,
      sort: true,
    }
  }, {
    name: "Autor",
    field: "autor",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "Año publicación",
    field: "ano_publicacion",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "Idioma",
    field: "idioma",
    options: {
      filter: true,
      sort: false,
    }
  }
];

  const onSubmit = data => {
    axios
      .post("http://localhost:8000/api/libros", data)
      .then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const { data } = await axios.get("http://localhost:8000/api/libros/mostrar");

    //const { data } = await axios.get("/api/zona/listar");
    console.log(data);
    setItem(data.libro);
    return null;
  }

  return (
    <div className="container">
      <Typography variant="h4" color="initial">
            REGISTRAR LIBRO <StorageIcon/>
      </Typography>
      <div className="datos">
        <form onSubmit={handleSubmit(onSubmit)} className="formulario">
          <input className={classes.inputForm} type="text" id="standard-basic" placeholder="Nombre libro" name="nombre" ref={register} />
          <input className={classes.inputForm} type="text" id="standard-basic" placeholder="Autor libro" name="autor" ref={register} />
          <input className={classes.inputForm} type="number" id="standard-basic" placeholder="Año publicación" name="ano_publicacion" ref={register} />
          <input className={classes.inputForm} type="text" id="standard-basic" placeholder="Idioma" name="idioma" ref={register} />
          <br></br><br></br>
          <Button
              className={classes.botonRegistrar} 
              type="submit" 
              variant="contained" 
              color="primary"
              endIcon={<MenuBookIcon/>}
          >
                    Guardar libro
          </Button>
          <br></br><br></br>
          <hr></hr>
        </form>
      </div>
      <br></br>
      <div className={classes.tabla}>
          <MaterialDatatable
            title={"Libros almacenados en MongoDB"}
            data={item}
            columns={columns}
            options={{
              selectableRows: false,
              print: false,
              onlyOneRowCanBeSelected: false,
              textLabels: {
                body: {
                  noMatch: "Lo sentimos, no se encuentran registros",
                  toolTip: "Sort",
                },
                pagination: {
                  next: "Siguiente",
                  previous: "Página Anterior",
                  rowsPerPage: "Filas por página:",
                  displayRows: "de",
                },
              },
              download: false,
              pagination: true,
              rowsPerPage: 5,
              usePaperPlaceholder: true,
              rowsPerPageOptions: [5, 10, 25],
              sortColumnDirection: "desc",
            }}

          />
        </div>
    </div>
  );
}