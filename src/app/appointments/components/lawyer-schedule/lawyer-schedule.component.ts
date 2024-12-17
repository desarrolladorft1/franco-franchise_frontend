import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { AppointmentDay, HourElement, LawyerSchedule } from '../../interfaces/schedule-component.interface';
import { UniversalService } from '@services/universal.service';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { LawyerDetail } from '../../interfaces/lawyer-list.interface';
import { ReBookedAppointment } from '../../interfaces/appointment.interface';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../../prime-ng/prime-ng-module';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'; // Plugin para la interacción de eventos (drag & drop, etc.)
import esLocale from '@fullcalendar/core/locales/es'; // Importar el idioma español
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin para mostrar el calendario en formato de cuadrícula
import { FullCalendarModule } from '@fullcalendar/angular';
import { data } from 'jquery';

@Component({
  standalone: true,
  selector: 'app-lawyer-schedule',
  imports: [CommonModule, PrimeNgModule, FullCalendarModule],
  templateUrl: './lawyer-schedule.component.html',
  styleUrl: './lawyer-schedule.component.css'
})

export class LawyerScheduleComponent implements OnInit {
  responsiveOptions: any[];
  schedule: LawyerSchedule[] = [];
  showMore: boolean = false;
  iconShowMore: string = 'pi pi-angle-down';
  showMoreText: string = 'Ver más';
  appointmentDay!: AppointmentDay;
  reBookedAppointment!: ReBookedAppointment;


  @Input() actionType: number = 1;
  @Input() citaId!: number;
  @Input() lawyer: LawyerDetail = {
    idAbogado: 0,
    apellidos: "",
    avatar: "",
    cantOpiniones: 1,
    descripcion: "",
    destacado: false,
    experiencias: "",
    favorito: 0,
    formacion: "",
    lastReview: "",
    nombres: "",
    precios: "",
    precios_number: 1,
    rating: "",
    specialty: "",
    cedula: "",
    licencia: "",

  }
  @Input() idAbogado: number = 0;
  @Input() days!: number;
  @Input() dates: any[] = [];
  @Input() isLogued!: boolean;
  @Input() pricePerDate: number = 0;
  @Output() reBookedAppointmentEvent = new EventEmitter<ReBookedAppointment>();

  userDb: any = {};
  userAuth: any = {};

  constructor(
    private ServiciosService: UniversalService,
    private router: Router,
    public auth: AuthService,
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1710px',
        numVisible: 4,
        numScroll: 4,
      },
      {
        breakpoint: '1580px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '1310px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '1070px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {

    this.buscarHorario(this.lawyer);
    console.log(this.dates);
    
    if (this.dates) {
      this.calendarOptions.events = this.dates.map((date: any) => ({
          title: "Cita",
          start: date.hora_dia_inicio,
          end: date.hora_dia_fin
      }));
  }
    
    this.calendarOptions.events = this.dates.map((e: any) => {
      return {
        title: "Agendado",
        start: e.hora_dia_inicio,
        end: e.hora_dia_fin,
      }
    });

    
    

    this.calendarOptions.events = this.blockedDates.map((blocked) => ({
      title: 'No disponible',
      start: new Date(blocked.start),
      end: new Date(blocked.end),
      backgroundColor: '#ff4d4d', // Color para destacar el evento bloqueado
      display: 'background', // Mostrar como fondo
    }));

  }

  private loadAppointments(): void {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');

    // Convertir citas a eventos para el calendario
    this.calendarOptions.events = storedAppointments.map((appointment: any) => ({
      title: 'Agendado',
      backgroundColor: '#c59b51',
      start: appointment.date,
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // console.log(changes);

    if (changes['lawyer']) {
      if (!changes['lawyer'].isFirstChange()) {
        this.buscarHorario(changes['lawyer'].currentValue);
      }
    }
  }

  buscarHorario(lawyer: LawyerDetail): LawyerSchedule[] {
    this.ServiciosService.getLawyerScheduleById(
      this.days,
      lawyer.idAbogado
    ).subscribe((horario) => {
      this.schedule = horario.data;
      return this.schedule;
    });

    return [];
  }

  mostrarMas(showMore: boolean) {
    this.showMore = !showMore;
    $('#hiddenOptions-' + this.lawyer.idAbogado).removeClass('initialState');
    if (this.showMore) {
      this.iconShowMore = 'pi pi-angle-up';
      $('#hiddenOptions-' + this.lawyer.idAbogado).removeClass('slideup');
      $('#hiddenOptions-' + this.lawyer.idAbogado).addClass('slidedown');
      this.showMoreText = 'Ver menos';
    } else {
      this.iconShowMore = 'pi pi-angle-down';
      $('#hiddenOptions-' + this.lawyer.idAbogado).toggleClass('slideup');
      $('#hiddenOptions-' + this.lawyer.idAbogado).toggleClass('slidedown');
      this.showMoreText = 'Ver más';
    }
  }



  isHourDisabled(available: number | null): boolean {
    if (available != null) {
      return available <= 0;
    } else {
      return true;
    }
  }

  isToday(someDate: Date): boolean {
    someDate = new Date(someDate);

    const today = new Date();
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  }

  isTomorrow(someDate: Date): boolean {
    someDate = new Date(someDate);
    const tomorrow = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);

    return (
      someDate.getDate() == tomorrow.getDate() &&
      someDate.getMonth() == tomorrow.getMonth() &&
      someDate.getFullYear() == tomorrow.getFullYear()
    );
  }

  isBeyondTomorrow(someDate: Date): boolean {
    someDate = new Date(someDate); EventEmitter
    const tomorrow = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);

    return someDate > tomorrow;
  }

  horaSeleccionadaAction(hour: HourElement, day: Date) {
    if (this.actionType === 1) {
      this.horaSeleccionadaAgendar(hour, day);
    } else if (this.actionType === 2) {
      if (this.citaId) {
        this.reBookedAppointment = {
          citaId: this.citaId,
          newHoraCitaId: hour.horaCitaId!,
          message: true,
        };
        this.reBookedAppointmentEvent.emit(this.reBookedAppointment);
      }
    }
  }

  horaSeleccionadaAgendar(hour: HourElement, day: Date) {
    new Promise((resolve, reject) => {
      $('body').removeClass('page-loaded');
      setTimeout(() => {
        $('#pageT').addClass('active');
        resolve(true);
      }, 1500);
    }).then((value) => {
      if (value) {
        this.appointmentDay = {
          date: day,
          hour: hour,
        };
        this.ServiciosService.setSelectedHour(
          'hourSelected',
          this.appointmentDay
        );


      }
    });
  }




  public calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin],
    locale: esLocale,
    selectable: true,
    initialView: "timeGridWeek",
    allDaySlot: false,
    slotMaxTime: "20:00:00",
    slotMinTime: "07:00:00",
    events: [],
    headerToolbar: {
      left: 'timeGridWeek,dayGridMonth',
      center: "",
      right: 'prev,next today',
    },
    dateClick: this.handleDateClick.bind(this),
    selectAllow: this.disableUnavailableSlots.bind(this),
  };

  private blockedDates: { start: number, end: number }[] = [];

 public disableUnavailableSlots(selectInfo: { start: Date, end: Date }): boolean {
    const start = selectInfo.start.getTime();
    const end = selectInfo.end.getTime();
  
    // Verificar si el intervalo se solapa con algún bloqueado
    return !this.blockedDates.some(blocked => 
      (start < blocked.end && end > blocked.start) // Condición de solapamiento
    );
  }
  

  public handleDateClick(arg: any) {
    if (!this.isLogued) {
      this.auth.loginWithRedirect({
        appState: { target: '/citas' },
      });
      return;
    }

    const calendarApi = arg.view.calendar;
    if (calendarApi.view.type === "dayGridMonth") {
      // Cambia la vista a 'timeGridWeek' y navega al día seleccionado
      return calendarApi.changeView('timeGridWeek', arg.date);
    }

    const selectedDate = new Date(arg.dateStr);
    const fechaCompleta = "" + selectedDate.getFullYear().toString() + "-" + selectedDate.getMonth().toString() + "-" + selectedDate.getDate().toString() + " " + selectedDate.getHours().toString() + ":"+selectedDate.getMinutes().toString()+":00";
    console.log("Soy la fecha seleccionada", fechaCompleta);

    // Leer las citas almacenadas en localStorage
    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    //Leer Id CLiente
     this.ServiciosService._universalAuth0().then(value => {
       this.userAuth = value.userAuth;
       this.userDb = value.userDb[0];
     });
    
    // this.ServiciosService.getDates(this.idAbogado, fechaCompleta).subscribe(value=>{
    //   const {data} = value; 
    //   console.log("Soy el disponible",data);
      
    // })

    // Verificar si la fecha está libre
    const isAvailable = !storedAppointments.some(
      (appointment: any) => appointment.date === selectedDate.toISOString().slice(0, 10) // Comparar solo la fecha
    );

    const dateOptions = {
      year: 'numeric' as const,
      month: 'long' as const,
      day: 'numeric' as const,
      hour: 'numeric' as const,
      minute: 'numeric' as const,
      hour12: true,
      hourCycle: "h12" as const,
    };

    if (isAvailable) {
      // Mostrar la ventana de confirmación de SweetAlert2
      Swal.fire({
        title: `¿Deseas agendar esta cita?`,
        text: `${Intl.DateTimeFormat("es-Es", dateOptions).format(selectedDate)}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, agendar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        console.log("result", result);

        if (result.isConfirmed) {
          this.ServiciosService.setShoppinCartNew({
            idCliente: this.userDb.idUsuario,
            idProd: 1,
            cantidad: 1,
            precio: 500,
            numFirmas: 0
          }).subscribe(res => {
            console.log(res);

          });

          // Si el usuario confirma, agrega el evento al calendario
          const newEvent: EventInput = {
            title: 'Agendado',
            start: selectedDate,
            backgroundColor: '#B47DC7',
          };

          // Actualizar visualmente el calendario
          this.calendarOptions.events = [
            ...(this.calendarOptions.events as EventInput[]),
            newEvent,
          ];

          // Guardar la nueva cita en el almacenamiento local
          storedAppointments.push({ date: selectedDate, lawyerId: this.lawyer.idAbogado });
          localStorage.setItem('appointments', JSON.stringify(storedAppointments));

          // Mostrar mensaje de éxito
          Swal.fire('Agendado', 'La cita ha sido agendada exitosamente.', 'success');
          const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
          carrito.push({
            tipo: "agenda",
            precio: this.pricePerDate,
          });
          localStorage.setItem("carrito", JSON.stringify(carrito));

        }
      });
    } else {
      // Si la fecha está ocupada, muestra un mensaje de alerta
      Swal.fire('Fecha ocupada', 'Lo sentimos, la fecha seleccionada ya está ocupada.', 'error');
    }
  }





}