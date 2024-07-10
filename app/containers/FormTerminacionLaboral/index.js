/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
/**
 *
 * FormTerminacionLaboral
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import {
  CloudUpload as CloudUploadIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
} from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFormTerminacionLaboral from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getEnterprises, getAddresses } from './actions';

export function FormTerminacionLaboral(props) {
  useInjectReducer({ key: 'formTerminacionLaboral', reducer });
  useInjectSaga({ key: 'formTerminacionLaboral', saga });

  useEffect(() => {
    props.dispatch(getAddresses());
    props.dispatch(getEnterprises());
  }, []);

  console.log(
    props.formTerminacionLaboral.addresses.map(adress => ({
      state: adress.state,
      id: adress.id,
    })),
  );

  const [formData, setFormData] = useState({
    motivoTerminacion: '',
    nombre: '',
    puesto: '',
    fechaIngreso: '',
    ultimoDiaTrabajo: '',
    sueldoDiarioBruto: '',
    jornadaLaboral: '',
    diaDescanso: '',
    domicilioFiscal: '',
    domicilioTrabajo: '',
    diasVacaciones: '',
    estadoEmpresa: '',
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [activeFile, setActiveFile] = useState({ url: null, type: null });
  const [formValid, setFormValid] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = event => {
    setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
  };

  const handleFilePreview = file => {
    const fileType = getFileType(file.name);
    const fileUrl = URL.createObjectURL(file);
    setActiveFile({ url: fileUrl, type: fileType });
  };

  const handleFileDelete = index => {
    const newFiles = selectedFiles.filter((_, idx) => idx !== index);
    setSelectedFiles(newFiles);
    if (activePdf === URL.createObjectURL(selectedFiles[index])) {
      setActivePdf(null);
      URL.revokeObjectURL(selectedFiles[index]);
    }
  };

  const getFileType = fileName => {
    if (fileName.endsWith('.pdf')) return 'pdf';
    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) return 'excel';
    if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) return 'word';
    return null; // Si el archivo no es ninguno de los tipos esperados
  };

  // Función para validar el formulario
  const validateForm = () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(formData)) {
      if (formData[key] === '') {
        return false;
      }
    }
    return true;
  };

  // Actualiza el estado del formulario válido
  useEffect(() => {
    setFormValid(validateForm());
  }, [formData]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              Detalles de terminación laboral
            </Typography>
            <TextField
              fullWidth
              label="Motivo Terminación Laboral"
              name="motivoTerminacion"
              variant="outlined"
              margin="normal"
              value={formData.motivoTerminacion}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Nombre del Colaborador"
              name="nombre"
              variant="outlined"
              margin="normal"
              value={formData.nombre}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Puesto o Categoría"
              name="puesto"
              variant="outlined"
              margin="normal"
              value={formData.puesto}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              type="date"
              label="Fecha de Ingreso"
              name="fechaIngreso"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              margin="normal"
              value={formData.fechaIngreso}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              type="date"
              label="Último Día de Trabajo"
              name="ultimoDiaTrabajo"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              margin="normal"
              value={formData.ultimoDiaTrabajo}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Sueldo Diario Bruto"
              name="sueldoDiarioBruto"
              variant="outlined"
              margin="normal"
              value={formData.sueldoDiarioBruto}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Jornada Laboral"
              name="jornadaLaboral"
              variant="outlined"
              margin="normal"
              value={formData.jornadaLaboral}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Día de Descanso"
              name="diaDescanso"
              variant="outlined"
              margin="normal"
              value={formData.diaDescanso}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              select
              label="Localización de la empresa"
              name="estadoEmpresa"
              variant="outlined"
              margin="normal"
              value={formData.estado}
              onChange={handleInputChange}
            >
              {props.formTerminacionLaboral.addresses.map(adress => (
                <MenuItem key={adress.id} value={adress.id}>
                  {adress.state}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Domicilio fiscal de la empresa"
              name="domicilioFiscal"
              variant="outlined"
              margin="normal"
              value={formData.domicilioFiscal}
              onChange={handleInputChange}
            >
              <MenuItem value="direccion1">
                Mier y Teran No 260 3er Piso Zona Centro, Ciudad Victoria
                Tamaulipas
              </MenuItem>
              {/* Agregar más opciones según necesidad */}
            </TextField>
            <TextField
              fullWidth
              select
              label="Domicilio fuente de trabajo"
              name="domicilioTrabajo"
              variant="outlined"
              margin="normal"
              value={formData.domicilioTrabajo}
              onChange={handleInputChange}
            >
              <MenuItem value="direccion2">
                Av. del Niño No. 2103 Col Exprofesa Oriente, Heroica Matamoros,
                Tamaulipas
              </MenuItem>
              {/* Agregar más opciones según necesidad */}
            </TextField>
            <TextField
              fullWidth
              label="Días de Vacaciones Adeudados"
              name="diasVacaciones"
              variant="outlined"
              margin="normal"
              value={formData.diasVacaciones}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 20 }}
              disabled={!formValid}
            >
              Enviar formulario
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Grid
              container
              xs={12}
              alignItems="flex-end"
              justifyContent="flex-end"
            >
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 10 }}
                disabled={selectedFiles.length === 0}
                startIcon={<StarIcon />}
              >
                AI
              </Button>
            </Grid>
            <Typography variant="h6">Cargar documentos</Typography>
            <Button
              variant="contained"
              color="default"
              startIcon={<CloudUploadIcon />}
              component="label"
            >
              Subir Archivo
              <input
                type="file"
                hidden
                accept="application/pdf,
            application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
            application/vnd.ms-excel,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document,
            application/msword"
                multiple
                onChange={handleFileChange}
              />
            </Button>
            <List dense>
              {selectedFiles.map((file, index) => (
                <ListItem key={index}>
                  <ListItemText primary={file.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="ver"
                      onClick={() => handleFilePreview(file)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="eliminar"
                      onClick={() => handleFileDelete(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
        <Paper style={{ marginTop: '10px', height: '800px' }}>
          {activeFile.url && (
            // eslint-disable-next-line jsx-a11y/iframe-has-title
            <iframe
              src={
                activeFile.type === 'pdf'
                  ? activeFile.url
                  : `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                      activeFile.url,
                    )}`
              }
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

FormTerminacionLaboral.propTypes = {
  dispatch: PropTypes.func.isRequired,
  formTerminacionLaboral: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  formTerminacionLaboral: makeSelectFormTerminacionLaboral(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FormTerminacionLaboral);
