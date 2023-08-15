import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  // Alertas de que ya se ha registrado ese elemento y no se puede hacer más
  async correoYaRegistrado() {
    const alert = await this.alertController.create({
      subHeader: 'Correo registrado',
      message: 'Este correo ya está registrado en el sistema. Ingrese uno distinto.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async alumnoYaRegistrado() {
    const alert = await this.alertController.create({
      subHeader: 'Alumno registrado',
      message: 'Este alumno ya está registrado en el sistema. Ingrese una matrícula distinta.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async rfidYaRegistrado() {
    const alert = await this.alertController.create({
      subHeader: 'RFID registrado',
      message: 'Este RFID ya está asociado a un alumno. Ingrese un RFID distinto.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async alumnoYaInscritoEnClase() {
    const alert = await this.alertController.create({
      subHeader: 'Alumno ya registrado',
      message: 'Este alumno ya está inscrito en la clase. Ingrese uno distinto.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async matriculaYaRegistrada() {
    const alert = await this.alertController.create({
      subHeader: 'Matrícula registrado',
      message: 'Esta matrícula ya está registrado en el sistema. Ingrese una distinta.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Alertas de que ingresen todos los campos y verificación de contraseñas
  async validarCampos() {
    const alert = await this.alertController.create({
      subHeader: 'Campos vacíos',
      message: 'Por favor, rellene todos los campos.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async validarMateriaFecha() {
    const alert = await this.alertController.create({
      subHeader: 'Campos vacíos',
      message: 'Por favor, seleccione la materia y la fecha antes de agregar un alumno.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async passMissmatch() {
    const alert = await this.alertController.create({
      subHeader: 'Contraseñas inválidas',
      message: 'Las contraseñas no coinciden, Verifique su entrada.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Alertas de registros exitosos
  async adminRegistrado() {
    const alert = await this.alertController.create({
      subHeader: 'Operación exitosa',
      message: 'El administrador se ha registrado correctamente',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async tutorRegistrado() {
    const alert = await this.alertController.create({
      subHeader: 'Operación exitosa',
      message: 'El tutor se ha registrado correctamente',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async alumnoRegistrado() {
    const alert = await this.alertController.create({
      subHeader: 'Operación exitosa',
      message: 'El alumno se ha registrado correctamente',
      buttons: ['OK'],
    });

    await alert.present();
  }


  async alumnoInscritoEnClase() {
    const alert = await this.alertController.create({
      subHeader: 'Operación exitosa',
      message: 'El alumno ha sido inscrito a la clase correctamente',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async claseRegistrada() {
    const alert = await this.alertController.create({
      subHeader: 'Operación exitosa',
      message: 'La clase se ha registrado correctamente',
      buttons: ['OK'],
    });

    await alert.present();
  }

  

  // Alertas de errores
  async errorRegistro() {
    const alert = await this.alertController.create({
      subHeader: 'Registro fallido',
      message: 'Hubo un problema al registrar. Por favor, inténtrlo de nuevo.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async errorAgregarAlumnoClase() {
    const alert = await this.alertController.create({
      subHeader: 'Inscripción fallida',
      message: 'Hubo un problema al inscribir al alumno en la clase. Por favor, inténtrlo de nuevo.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async errorVerificarCorreo() {
    const alert = await this.alertController.create({
      subHeader: 'Verificación fallida',
      message: 'Hubo un problema al verificar el correo. Por favor, inténtelo de nuevo.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async errorVerificarMatricula() {
    const alert = await this.alertController.create({
      subHeader: 'Verificación fallida',
      message: 'Hubo un problema al verificar la matrícula. Por favor, inténtelo de nuevo.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async errorTutorNotFound() {
    const alert = await this.alertController.create({
      subHeader: 'Tutor no encontrado',
      message: 'Verifica que la matrícula ingresada esté correcta.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async errorAlumnoNotFound() {
    const alert = await this.alertController.create({
      subHeader: 'Alumno no encontrado',
      message: 'Verifica que la matrícula ingresada esté correcta.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async errorUsuarioNotFound() {
    const alert = await this.alertController.create({
      subHeader: 'Usuario no encontrado',
      message: 'Verifica que los datos estén correctos.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
