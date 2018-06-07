// import React, { Component } from 'react';
// import {
//     Step,
//     Stepper,
//     StepLabel,
//     StepContent,
//     StepButton,
//   } from 'material-ui/Stepper';
//   import AppBar from 'material-ui/AppBar'
//   import RaisedButton from 'material-ui/RaisedButton';
//   import FlatButton from 'material-ui/FlatButton';
//   import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
//   import DatePicker from 'material-ui/DatePicker';
//   import SelectField from 'material-ui/SelectField';
//   import MenuItem from 'material-ui/MenuItem';
//   import {
//     RadioButton,
//     RadioButtonGroup
//   } from 'material-ui/RadioButton'
// import TextField from 'material-ui/TextField';
// import Dialog from 'material-ui/Dialog';
// import Divider from 'material-ui/Divider';
// import SnackBar from 'material-ui/Snackbar';
// import TimePicker from 'material-ui/TimePicker'
// import moment from 'moment'
// import CommonUtils from '../../utils/CommonUtils';
// import { Link } from 'react-router-dom';
// import { withRouter } from 'react-router';

// class Appointment extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           loading: true,
//           navOpen: false,
//           confirmationModalOpen: false,
//           confirmationTextVisible: false,
//           stepIndex: 0,
//           appointmentDateSelected: false,
//           appointmentDate:'',
//           appointmentMeridiem: 0,
//           smallScreen: window.innerWidth < 768,
//           confirmationSnackbarOpen: false,
//           data: {},
//           appointmentSlot:'',
//           firstName:'',
//           lastName:'',
//           email:'',
//           phone:'',
//           schedule:"",
//           validEmail: true,
//           validPhone: true,

        
//         }
//         this.handleNextStep = this.handleNextStep.bind(this)
//         this.handleSetAppointmentDate = this.handleSetAppointmentDate.bind(this)
//         this.checkDisableDate = this.checkDisableDate.bind(this)
//         this.renderAppointmentTimes = this.renderAppointmentTimes.bind(this)
//         this.handleSetAppointmentMeridiem = this.handleSetAppointmentMeridiem.bind(this)
//         this.renderAppointmentConfirmation = this.renderAppointmentConfirmation.bind(this)
//         this.renderConfirmationString = this.renderConfirmationString.bind(this)
//         this.validateEmail = this.validateEmail.bind(this)
//         this.validatePhone = this.validatePhone.bind(this)
//         this.handleSetAppointmentSlot = this.handleSetAppointmentSlot.bind(this)
        
//     }

 

//     componentWillMount(){
//       CommonUtils.getAppointmentSlots()
//       .then((response) => {
//         console.log("response..."+JSON.stringify(response))
//         if(response.availableslots.length > 0)
//           this.handleFetch(response.availableslots)
//         else this.handleFetch(response.alternateslots)
//       })
//       .catch((error) => {
//         console.log("error:"+JSON.stringify(error))
//       })
//     }

//     handleFetch(response) {
//       //console.log("handleFetch response..."+JSON.stringify(response))
//       //const  appointments  = [{"date":"05-02-2018","timeSlots":["11:00 - 12:00","13:00 - 14:00"]}]
//       const { configs, appointments } = response
//       const initSchedule = {}
//       const today = moment().startOf('day')
//       initSchedule[today.format('YYYY-DD-MM')] = true
//       const schedule = !appointments.length ? initSchedule : appointments.reduce((currentSchedule, appointment) => {
//         const { date, slot } = appointment
//         console.log("date.."+date+"..."+slot)
//         const dateString = moment(date, 'YYYY-DD-MM').format('YYYY-DD-MM');
//         console.log("dateString.."+dateString)
//         !currentSchedule[date] ? currentSchedule[dateString] = Array(8).fill(false) : null
//         Array.isArray(currentSchedule[dateString]) ?
//           currentSchedule[dateString][slot] = true : null
//         return currentSchedule
//       }, initSchedule)
  
//       //Imperative x 100, but no regrets
//       for (let day in schedule) {
//         let slots = schedule[day]
//         slots.length ? (slots.every(slot => slot === true)) ? schedule[day] = true : null : null
//       }
  
//       this.setState({
//         schedule
//       },()=>{
//         // console.log("schedule..."+JSON.stringify(this.state.schedule))

//         loading: false})
//     }


//     handleFetchError(err) {
//       console.log(err)
//       this.setState({ confirmationSnackbarMessage: 'Error fetching data', confirmationSnackbarOpen: true })
//     }
//      handleSubmit(response){    
//        const appointment = {
//         date: moment(this.state.appointmentDate).format('YYYY-DD-MM'),
//         slot: this.state.appointmentSlot,
//         name: this.state.firstName + ' ' + this.state.lastName,
//         email: this.state.email,
//         phone: this.state.phone
//      }
//      CommonUtils.getAddEvent(appointment).then((response) => {
//        console.log('getAddEvent',response)
//         if (response !== null) {
//           console.log("save events", response)
//         }


//       });
//      this.setState({ confirmationSnackbarMessage: "Appointment succesfully added!", confirmationSnackbarOpen: true, processed: true }); 
//      this.setState({confirmationModalOpen:false},()=>{
//       this.props.history.push("/dashboard");
//     })
//     }

//     validateEmail(email) {
//         const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
//         return regex.test(email) ? this.setState({ email: email, validEmail: true }) : this.setState({ validEmail: false })
//         console.log(email)
//       }
    
//       validatePhone(phoneNumber) {
//         const regex = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/
//         return regex.test(phoneNumber) ? this.setState({ phone: phoneNumber, validPhone: true }) : this.setState({ validPhone: false })
//         console.log(phoneNumber)
//       }
    
//       checkDisableDate(day) {
//         const dateString = moment(day).format('YYYY-DD-MM')
//         return this.state.schedule[dateString] === true || moment(day).startOf('day').diff(moment().startOf('day')) < 0
//       }
    
//     handleNextStep() {
//         const { stepIndex } = this.state
//         console.log(this.state.data);
//         return (stepIndex < 3) ? this.setState({ stepIndex: stepIndex + 1}) : null
//       }
//     handleSetAppointmentDate(date) {
//         this.handleNextStep()
//         this.setState({ appointmentDate: date, confirmationTextVisible: true })
//     }
    
//     handleSetAppointmentMeridiem(meridiem) {
//         this.setState({ appointmentMeridiem: meridiem},()=>{
//           console.log("meridiem..."+this.state.appointmentMeridiem)
//         })
//     }
//     renderConfirmationString() {
//             const spanStyle = {color: '#00bcd4',

//           }
          
//           return this.state.confirmationTextVisible ? <h2 style={{ textAlign: this.state.smallScreen ? 'center' : 'left', color: '#bdbdbd', lineHeight: 1.5, padding: '0 10px',fontSize:'10', fontWeight: 'bold',fontFamily:' sans-serif '}}>
//               { <span>  
                  
//                  Scheduling a
//                    <span style={spanStyle}> 1 hour </span>
//                       appointment {this.state.appointmentDate && <span> <span> on   </span>
//                  <span style={spanStyle}>{ moment(this.state.appointmentDate).format('dddd[,] MMMM Do')}</span>
//                 </span>} 
//                 {
//                   (this.state.appointmentDate && this.state.appointmentSlot) 
//                   ?
//                    <span>  at  <span style={spanStyle}>{this.state.appointmentSlot}</span> </span>
//                   :null 
//               }
//               </span>}
//             </h2> : null
//         }
    
//     renderAppointmentConfirmation() {
//         const spanStyle = { color: '#00bcd4' }
//         return <section>
//           <p>Name: <span style={spanStyle}>{this.state.firstName} {this.state.lastName}</span></p>
//           <p>Number: <span style={spanStyle}>{this.state.phone}</span></p>
//           <p>Email: <span style={spanStyle}>{this.state.email}</span></p>
//           <p>Appointment: <span style={spanStyle}>{moment(this.state.appointmentDate).format('dddd[,] MMMM Do[,] YYYY')}</span> at <span style={spanStyle}>{  this.state.appointmentSlot}</span></p>
//         </section>
//     }
//     _changeRadio(e, value) {
//         console.log('>>>>', value);
//     }        

//     renderAppointmentTimes() {
//           const slots = [...Array(8).keys()]
//           return slots.map(slot => {
//             console.log('sloT>>>>>>')
//             // console.log(slot)
//             const appointmentDateString = moment(this.state.appointmentDate).format('YYYY-DD-MM')
//             const t1 = moment().hour(9).minute(0).add(slot, 'hours')
//             const t2 = moment().hour(9).minute(0).add(slot + 1, 'hours')
//             const scheduleDisabled = this.state.schedule[appointmentDateString] ? this.state.schedule[moment(this.state.appointmentDate).format('YYYY-DD-MM')][slot] : false
//             const meridiemDisabled = this.state.appointmentMeridiem ? t1.format('a') === 'am' : t1.format('a') === 'pm'
//             //const time = moment().hour(9).minute(0).add(this.state.appointmentSlot, 'hours').format('h:mm a')
//             const time = t1.format('h:mm a') + ' - ' + t2.format('h:mm a') ;
//             // let date = moment();
//             if(this.state.appointmentDate == '')  
//             {
//             return <RadioButton
//               label={t1.format('h:mm a') + ' - ' + t2.format('h:mm a')}
//               key={slot}
//               value={time}
//               style={{marginBottom: 15, display: meridiemDisabled ? 'none' : 'inherit'}}
//               disabled={scheduleDisabled || meridiemDisabled}
//        />
//             }
//             else {
//               return <RadioButton
//               label={moment(this.state.appointmentDate).format('YYYY-DD-MM') +'   '+  t1.format('h:mm a') + ' - ' + t2.format('h:mm a')}
//               key={slot}
//               value={time}
//               style={{marginBottom: 15, display: meridiemDisabled ? 'none' : 'inherit'}}
//               disabled={scheduleDisabled || meridiemDisabled}
//               />
//             }
//           })
//      }
 
//   handleSetAppointmentSlot(slot) {
//       console.log("sloat on change>>>>",slot)
//       this.setState({ appointmentSlot: slot })
//       console.log(this.state.appointmentSlot)
//       this.handleNextStep()
//     }

//     render() {
//         const { stepIndex, loading, navOpen, smallScreen, confirmationModalOpen, confirmationSnackbarOpen} = this.state
//         const contactFormFilled = this.state.data.firstName && this.state.data.lastName && this.state.data.phone && this.state.data.email && this.state.data.validPhone && this.state.data.validEmail
//         const modalActions = [
//           <FlatButton
//             label="Cancel"
//             primary={false}
//             onClick={() => this.setState({ confirmationModalOpen : false})} />,
//           <FlatButton
           
//             label="Confirm"
//             primary={true}
//             onClick={() => this.handleSubmit()} />
//          ]

//         const Appbarstyle={
//              textAlign:"center",
//             // fontWeight: "bold",
//              fontsize:"700px"
//          }
       
//           return (
//           <div>  
//             <AppBar showMenuIconButton={false} title="Jello Appointment"  style={Appbarstyle} /> 
//               <section style={{
//                 maxWidth: !smallScreen ? '80%' : '100%',
//                 margin: 'auto',
//              //   fontWeight:'700',
//                 marginTop: !smallScreen ? 20 : 0,
//               }}>
            
//             {this.renderConfirmationString()}
//                 <Card style={{
//                 padding: '10px 10px 25px 10px',
//                 height: this.state.smallScreen ? '100%' : null
//                 }}>
//                {/* Step one */}
//                 <Stepper activeStep={stepIndex} 
//                         linear={false}
//                          orientation="vertical">
//                      <Step>
//                         <StepButton onClick={() => this.setState({ stepIndex: 0 })}>

//                         <div class="appointment" > Choose an available day for your appointment</div>
//                         </StepButton>
//                         <StepContent>
//                           <DatePicker
//                             style={{
//                                 marginTop: 10,
//                                 marginLeft: 10
//                             }}
//                             value={this.state.appointmentDate}
//                             hintText="Select a date"
//                             mode={this.state.smallScreen ? 'portrait' : 'landscape'}
//                             onChange={(n, date) => this.handleSetAppointmentDate(date)}
//                             shouldDisableDate={day => this.checkDisableDate(day)}
//                           />

                          
//                         </StepContent>
//                       </Step>
                
//                 {/* step two */}
//                       <Step disabled={ !this.state.appointmentDate }>
//                           <StepButton onClick={() =>{
//                             if(this.state.appointmentDate != ""){
//                             this.setState({ stepIndex: 1 })
//                            }
                       
//                           }}>
//                           <div class="appointment" >  Choose an available time for your appointment</div>
//                          </StepButton>
//                          <StepContent>
//                         <SelectField
//                           floatingLabelText="AM or PM"
//                           value={this.state.appointmentMeridiem}
//                           onChange={(evt, key, payload) =>{
//                               this.handleSetAppointmentMeridiem(payload)
//                               }
//                             }
//                           selectionRenderer={value => value ? 'PM' : 'AM'}>
//                           <MenuItem value={0}>AM</MenuItem>
//                           <MenuItem value={1}>PM</MenuItem>
//                         </SelectField>
//                         <RadioButtonGroup
//                           style={{ 
//                                   marginTop: 15,
//                                   marginLeft: 15
//                                 }}
//                           name="appointmentTimes"
//                           defaultSelected={this.state.appointmentSlot}
//                           onChange={(evt, val) => this.handleSetAppointmentSlot(val)}>
//                           {this.renderAppointmentTimes()}
//                         </RadioButtonGroup>
//                     </StepContent>
//                   </Step>
                
//                 {/* step three */}
//                  <Step disabled={ !this.state.appointmentSlot}>
//                       <StepButton onClick={() => {
//                           if(this.state.appointmentDate != ""){
//                             this.setState({ stepIndex: 2 })
//                           }
//                         }
//                       }>  
//                       <div class="appointment" >  Share your contact information with us and we'll send you a reminder  </div>
//                           </StepButton>
//                       <StepContent>
//                       <section>
//                       <TextField
//                         style={{ display: 'block' }}
//                         name="first_name"
//                         hintText="First Name"
//                         floatingLabelText="First Name"
//                         onChange={(evt, newValue) => this.setState({ firstName: newValue })}/>
//                       <TextField
//                         style={{ display: 'block' }}
//                         name="las t_name"
//                         hintText="Last Name"
//                         floatingLabelText="Last Name"
//                         onChange={(evt, newValue) => this.setState({ lastName: newValue })}/>
//                       <TextField
//                         style={{ display: 'block' }}
//                         name="email"
//                         hintText="name@mail.com"
//                         floatingLabelText="Email"
//                         errorText={this.state.validEmail ? null : 'Enter a valid email address'}
//                         onChange={(evt, newValue) => this.validateEmail(newValue)}/>
//                       <TextField
//                         style={{ display: 'block' }}
//                         name="phone"
//                         hintText="(888) 888-8888"
//                         floatingLabelText="Phone"
//                         errorText={this.state.validPhone ? null: 'Enter a valid phone number'}
//                         onChange={(evt, newValue) => this.validatePhone(newValue)} />
//                         <div class="row">
//                         <div class="col-sm-12">
//                         <RaisedButton
//                             style={{display: 'block',
//                                     height:'auto !important'}}
//                             label={(this.state.firstName && this.state.lastName && this.state.email && this.state.phone && this.state.validEmail && this.state.validPhone) ? 'Schedule' : 'Fill out your information to schedule'}
//                             labelPosition="before"
//                             primary={true}
//                             fullWidth={true}
//                             // onClick={() => console.log(this.state.firstName,this.state.lastName,this.state.email,this.state.phone)}
//                             onClick={() => this.setState({ confirmationModalOpen: !this.state.confirmationModalOpen })}
//                             disabled={(this.state.firstName && this.state.lastName && this.state.email && this.state.phone) === '' ? true : false }
//                             //disabled={!contactFormFilled || this.state.processed }
//                            // style={{ marginTop: 20, maxWidth: 100}}
                            
//                            />
//                             </div>
//                             </div>
//                     </section>      
//                     </StepContent>
//                   </Step>
//               </Stepper>
//             </Card>
//                  <Dialog
//                     modal={true}
//                     open={confirmationModalOpen}
//                     actions={modalActions}
//                     title="Confirm your appointment">
//                     {this.renderAppointmentConfirmation()}
//                 </Dialog> 
//                 <SnackBar
//                   open={confirmationSnackbarOpen}
//                   message={loading ? this.state.confirmationSnackbarMessage : 'Loading... '}
//                   autoHideDuration={2000}
//                   onRequestClose={() => this.setState({ confirmationSnackbarOpen: false })}
//                    />
//                </section>
//          </div>
        
//         )       
//     }
// }
// export default withRouter(Appointment);
import React, { Component } from 'react';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
    StepButton,
  } from 'material-ui/Stepper';
  import AppBar from 'material-ui/AppBar'
  import RaisedButton from 'material-ui/RaisedButton';
  import FlatButton from 'material-ui/FlatButton';
  import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
  import DatePicker from 'material-ui/DatePicker';
  import SelectField from 'material-ui/SelectField';
  import MenuItem from 'material-ui/MenuItem';
  import {
    RadioButton,
    RadioButtonGroup
  } from 'material-ui/RadioButton'
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import SnackBar from 'material-ui/Snackbar';
import TimePicker from 'material-ui/TimePicker'
import moment from 'moment'
import CommonUtils from '../../utils/CommonUtils';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { CircularProgress } from 'material-ui';

class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          navOpen: false,
          confirmationModalOpen: false,
          confirmationTextVisible: false,
          stepIndex: 0,
          appointmentDateSelected: false,
          appointmentDate:'',
          appointmentMeridiem: 0,
          smallScreen: window.innerWidth < 768,
          confirmationSnackbarOpen: false,
          data: {},
          appointmentSlot:'',
          firstName:'',
          lastName:'',
          email:'',
          phone:'',
          schedule:"",
          validEmail: true,
          validPhone: true,
          totalSlots : [],
          availableSlotsEmpty : false,
          showDefaultSlots:false
        }
        this.handleNextStep = this.handleNextStep.bind(this)
        this.handleSetAppointmentDate = this.handleSetAppointmentDate.bind(this)
        this.checkDisableDate = this.checkDisableDate.bind(this)
        this.renderAppointmentTimes = this.renderAppointmentTimes.bind(this)
        this.handleSetAppointmentMeridiem = this.handleSetAppointmentMeridiem.bind(this)
        this.renderAppointmentConfirmation = this.renderAppointmentConfirmation.bind(this)
        this.renderConfirmationString = this.renderConfirmationString.bind(this)
        this.validateEmail = this.validateEmail.bind(this)
        this.validatePhone = this.validatePhone.bind(this)
        this.handleSetAppointmentSlot = this.handleSetAppointmentSlot.bind(this)
        
    }

    handleFetch(response) {
      this.setState({totalSlots:response})
      const initSchedule = {}
      const today = moment().startOf('day')
      initSchedule[today.format('YYYY-DD-MM')] = true
      const schedule = !response.length ? initSchedule : response.reduce((currentSchedule, appointment) => {
        const startTime = appointment.startTime.split(" ");
        const endTime = appointment.endTime.split(" ");
        const date = startTime[0];
        const slot = startTime[1]+" "+"-"+" "+endTime[1];
        const dateString = moment(date, 'YYYY-DD-MM').format('YYYY-DD-MM');
        currentSchedule[date] ? currentSchedule[dateString] = Array(8).fill(false) : null
        Array.isArray(currentSchedule[dateString]) ?
          currentSchedule[appointment.name][dateString][slot] = true : null
        return currentSchedule
      }, initSchedule)

      
      
      
      //Imperative x 100, but no regrets
      for (let day in schedule) {
        let slots = schedule[day]
        slots.length ? (slots.every(slot => slot === true)) ? schedule[day] = true : null : null
      }
      this.setState({ schedule },()=>{loading: false})
    }


    handleFetchError(err) {
      console.log(err)
      this.setState({ confirmationSnackbarMessage: 'Error fetching data', confirmationSnackbarOpen: true })
    }
     handleSubmit(response){ 
      let choosenSlot =  this.state.appointmentSlot;
        let n = choosenSlot.indexOf('/');
        if(n > 0){
          choosenSlot = choosenSlot.split("/")[1];
        }
       const appointment = {
        date: moment(this.state.appointmentDate).format('YYYY-DD-MM'),
        slot: choosenSlot,
        name: this.state.firstName + ' ' + this.state.lastName,
        email: this.state.email,
        phone: this.state.phone
     }
     CommonUtils.getAddEvent(appointment).then((response) => {
       console.log('getAddEvent',response)
        if (response !== null) {
          console.log("save events", response)
        }
      });
     this.setState({ confirmationSnackbarMessage: "Appointment succesfully added!", confirmationSnackbarOpen: true, processed: true }); 
     this.setState({confirmationModalOpen:false,appointmentSlot:"",appointmentDate:"", firstName:"",lastName:"", email:"", phone:"", stepIndex:0, confirmationTextVisible:false})
    }

    validateEmail(email) {
        const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        return regex.test(email) ? this.setState({ email: email, validEmail: true }) : this.setState({ validEmail: false })
        console.log(email)
      }
    
      validatePhone(phoneNumber) {
        const regex = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/
        return regex.test(phoneNumber) ? this.setState({ phone: phoneNumber, validPhone: true }) : this.setState({ validPhone: false })
        console.log(phoneNumber)
      }
    
      checkDisableDate(day) {
        const dateString = moment(day).format('YYYY-DD-MM')
        return this.state.schedule[dateString] === true || moment(day).startOf('day').diff(moment().startOf('day')) < 0
      }
    
    handleNextStep() {
        const { stepIndex } = this.state
        console.log(this.state.data);
        return (stepIndex < 3) ? this.setState({ stepIndex: stepIndex + 1}) : null
      }
      handleSetAppointmentDate(date) {
        this.handleNextStep()
        this.setState({ appointmentDate: date, confirmationTextVisible: true },()=>{
          if(this.state.appointmentDate){
            CommonUtils.getAppointmentSlots("Purple Grids", date)
            .then((response) => {
              if(response.availableSlots.length == 0 && response.alternateSlots.length==0){
                this.setState({availableSlotsEmpty:false})
              }
              if(response.availableSlots.length > 0){
                this.setState({availableSlotsEmpty:false},()=>{
                  this.handleFetch(response.availableSlots)
                })
              }
              else if(response.alternateSlots.length > 0) {
                this.setState({availableSlotsEmpty:true},()=>{
                  this.handleFetch(response.alternateSlots)
                })
              }
            })
            .catch((error) => {
              console.log("error:"+JSON.stringify(error))
            })
          }
        })
    }
    
    handleSetAppointmentMeridiem(meridiem) {
        this.setState({ appointmentMeridiem: meridiem},()=>{
          console.log("meridiem..."+this.state.appointmentMeridiem)
        })
    }
    renderConfirmationString() {
            const spanStyle = {color: '#00bcd4'}
            let choosenSlot = this.state.appointmentSlot, choosenDate = this.state.appointmentDate;
            let n = choosenSlot.indexOf('/');
            if(n > 0){
              choosenSlot = choosenSlot.split("/")[1];
            }
            return this.state.confirmationTextVisible? <h2 style={{ textAlign: this.state.smallScreen ? 'center' : 'left', color: '#bdbdbd', lineHeight: 1.5, padding: '0 10px',fontSize:'10', fontWeight: 'bold',fontFamily:' sans-serif '}}>
               {
                 this.state.availableSlotsEmpty ? <span> No appointment slots available for the chosen date <span style={spanStyle}>{" "+moment(choosenDate).format('dddd[,] MMMM Do')}</span>. Please choose alternate slots provided below </span>  :  <span>
                  Scheduling a
                  <span style={spanStyle}> 1 hour </span>
                  appointment {choosenDate && <span>  on 
                   <span style={spanStyle}>{" "+moment(choosenDate).format('dddd[,] MMMM Do')}</span>
                  </span>} 
                  {
                    (choosenDate && choosenSlot) 
                    ?
                     <span>  at  <span style={spanStyle}>{choosenSlot}</span> </span>
                    :null 
                }
                </span>
                }
              
            </h2> : null
        }
    
    renderAppointmentConfirmation() {
        const spanStyle = { color: '#00bcd4' }
        let choosenSlot =  this.state.appointmentSlot;
        let n = choosenSlot.indexOf('/');
        if(n > 0){
          choosenSlot = choosenSlot.split("/")[1];
        }
        return <section>
          <p>Name: <span style={spanStyle}>{this.state.firstName} {this.state.lastName}</span></p>
          <p>Number: <span style={spanStyle}>{this.state.phone}</span></p>
          <p>Email: <span style={spanStyle}>{this.state.email}</span></p>
          <p>Appointment: <span style={spanStyle}>{moment(this.state.appointmentDate).format('dddd[,] MMMM Do[,] YYYY')}</span> at <span style={spanStyle}>{ choosenSlot }</span></p>
        </section>
    }
    _changeRadio(e, value) {
        console.log('>>>>', value);
    }        

    renderAppointmentTimes() {
      const slots = this.state.totalSlots;
      console.log("slots...."+slots.length)
      if(slots.length>0){
        return slots.map((slot, key) => {
          const startTime = slot.startTime.split(" ");
          const endTime = slot.endTime.split(" ");
          let date = moment(startTime[0]).format('YYYY-MM-DD');
          let slotIn = startTime[1]+" "+"-"+" "+endTime[1];
          let appointmentDateString = moment(date).format('YYYY-DD-MM')
          let t1 = moment().hour(9).minute(0).add(slotIn, 'hours')
          let t2 = moment().hour(9).minute(0).add(slotIn + 1, 'hours')
          let scheduleDisabled = this.state.schedule[appointmentDateString] ? this.state.schedule[moment(date).format('YYYY-DD-MM')][slot] : false
          let meridiemDisabled = this.state.appointmentMeridiem ? t1.format('a') === 'am' : t1.format('a') === 'pm'
          let time = date + ' / ' + moment(startTime[1], 'HH:mm').format('hh:mm a') + ' - ' + moment(endTime[1], 'HH:mm').format('hh:mm a');
          if(this.state.appointmentDate == '') {
            return <RadioButton
              label={t1.format('h:mm a') + ' - ' + t2.format('h:mm a')}
              key={slot}
              value={time}
              style={{marginBottom: 15, display: meridiemDisabled ? 'none' : 'inherit'}}
              disabled={scheduleDisabled || meridiemDisabled} />
          }
          else {
            return <RadioButton
            label={slot.name +'   '+ date +'   '+  moment(startTime[1], 'HH:mm').format('hh:mm a')  + ' - ' + moment(endTime[1], 'HH:mm').format('hh:mm a') }
            key={key}
            value={time}
            style={{marginBottom: 15, display: meridiemDisabled ? 'none' : 'inherit'}}
            disabled={scheduleDisabled || meridiemDisabled} />
          }
        })
      }
      else{
        const defaultSlots = [...Array(8).keys()]
          return defaultSlots.map(slot => {
            console.log('sloT>>>>>>')
            // console.log(slot)
            let appointmentDateString = moment(this.state.appointmentDate).format('YYYY-DD-MM')
            let t1 = moment().hour(9).minute(0).add(slot, 'hours')
            let t2 = moment().hour(9).minute(0).add(slot + 1, 'hours')
            let scheduleDisabled = this.state.schedule[appointmentDateString] ? this.state.schedule[moment(this.state.appointmentDate).format('YYYY-DD-MM')][slot] : false
            let meridiemDisabled = this.state.appointmentMeridiem ? t1.format('a') === 'am' : t1.format('a') === 'pm'
            //const time = moment().hour(9).minute(0).add(this.state.appointmentSlot, 'hours').format('h:mm a')
            let time = t1.format('h:mm a') + ' - ' + t2.format('h:mm a') ;
            // let date = moment();
            if(this.state.appointmentDate == '')  
            {
            return <RadioButton
              label={t1.format('h:mm a') + ' - ' + t2.format('h:mm a')}
              key={slot}
              value={time}
              style={{marginBottom: 15, display: meridiemDisabled ? 'none' : 'inherit'}}
              disabled={scheduleDisabled || meridiemDisabled}
       />
            }
            else {
              return <RadioButton
              label={moment(this.state.appointmentDate).format('YYYY-DD-MM') +'   '+  t1.format('h:mm a') + ' - ' + t2.format('h:mm a')}
              key={slot}
              value={time}
              style={{marginBottom: 15, display: meridiemDisabled ? 'none' : 'inherit'}}
              disabled={scheduleDisabled || meridiemDisabled}
              />
            }
          })
      } 
    }
 
  handleSetAppointmentSlot(slot) {
    let n = slot.indexOf('/');
    if(n > 0){
      let slotDate = slot.split("/")[0];
      this.setState({appointmentDate: slotDate , availableSlotsEmpty:false})
    }
    else{
      let slotDate =  slot
    }
      this.setState({ appointmentSlot: slot})
      this.handleNextStep()
    }

    render() {
        const { stepIndex, loading, navOpen, smallScreen, confirmationModalOpen, confirmationSnackbarOpen} = this.state
        const contactFormFilled = this.state.data.firstName && this.state.data.lastName && this.state.data.phone && this.state.data.email && this.state.data.validPhone && this.state.data.validEmail
        const modalActions = [
          <FlatButton
            label="Cancel"
            primary={false}
            onClick={() => this.setState({ confirmationModalOpen : false})} />,
          <FlatButton
           
            label="Confirm"
            primary={true}
            onClick={() => this.handleSubmit()} />
         ]

        const Appbarstyle={
             textAlign:"center",
             fontsize:"700px"
         }
       
          return (
          <div>  
            <AppBar showMenuIconButton={false} title="Jello Appointment" style={Appbarstyle} /> 
              <section style={{
                maxWidth: !smallScreen ? '80%' : '100%',
                margin: 'auto',
                marginTop: !smallScreen ? 20 : 0,
              }}>
            
            {this.renderConfirmationString()}
                <Card style={{
                padding: '10px 10px 25px 10px',
                height: this.state.smallScreen ? '100%' : null
                }}>
               {/* Step one */}
                <Stepper activeStep={stepIndex} 
                        linear={false}
                         orientation="vertical">
                     <Step>
                        <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
                        <div class="appointment" > Choose an available day for your appointment</div>
                        </StepButton>
                        <StepContent>
                          <DatePicker
                           style={{
                                     marginTop: 10,
                                    marginLeft: 10
                                  }}
                            value={this.state.appointmentDate}
                            hintText="Select a date"
                            mode={this.state.smallScreen ? 'portrait' : 'landscape'}
                            onChange={(n, date) => this.handleSetAppointmentDate(date)}
                            shouldDisableDate={day => this.checkDisableDate(day)}
                          />
                        </StepContent>
                      </Step>
                
                {/* step two */}
                      <Step disabled={ !this.state.appointmentDate }>
                          <StepButton onClick={() =>{
                            if(this.state.appointmentDate != ""){
                            this.setState({ stepIndex: 1 })
                           }
                       
                          }}>
                          <div class="appointment" >  Choose an available time for your appointment</div>
                         </StepButton>
                         <StepContent>
                           {
                             this.state.totalSlots.length > 0 ? (<RadioButtonGroup
                             style={{ 
                                     marginTop: 15,
                                     marginLeft: 15
                                   }}
                             name="appointmentTimes"
                             defaultSelected={this.state.appointmentSlot}
                             onChange={(evt, val) => this.handleSetAppointmentSlot(val)}>
                             {this.renderAppointmentTimes()}
                                  </RadioButtonGroup> ) : 
                             ( !this.state.availableSlotsEmpty ? (
                              <RadioButtonGroup
                             style={{ 
                                     marginTop: 15,
                                     marginLeft: 15
                                   }}
                             name="appointmentTimes"
                             defaultSelected={this.state.appointmentSlot}
                             onChange={(evt, val) => this.handleSetAppointmentSlot(val)}>
                             {this.renderAppointmentTimes()}
                                  </RadioButtonGroup>
                             ) :(
                              <div style={{ marginTop:25, textAlign:"center" }}> <CircularProgress/> </div>
                             )
                             
                            )
                             
                           
                             
                           }
                    </StepContent>
                  </Step>
                
                {/* step three */}
                 <Step disabled={ !this.state.appointmentSlot}>
                      <StepButton onClick={() => {
                          if(this.state.appointmentDate != ""){
                            this.setState({ stepIndex: 2 })
                          }
                        }
                      }>  
                      <div class="appointment" >  Share your contact information with us and we'll send you a reminder  </div>
                          </StepButton>
                      <StepContent>
                      <section>
                      <TextField
                        style={{ display: 'block' }}
                        name="first_name"
                        hintText="First Name"
                        floatingLabelText="First Name"
                        onChange={(evt, newValue) => this.setState({ firstName: newValue })}/>
                      <TextField
                        style={{ display: 'block' }}
                        name="las t_name"
                        hintText="Last Name"
                        floatingLabelText="Last Name"
                        onChange={(evt, newValue) => this.setState({ lastName: newValue })}/>
                      <TextField
                        style={{ display: 'block' }}
                        name="email"
                        hintText="name@mail.com"
                        floatingLabelText="Email"
                        errorText={this.state.validEmail ? null : 'Enter a valid email address'}
                        onChange={(evt, newValue) => this.validateEmail(newValue)}/>
                      <TextField
                        style={{ display: 'block' }}
                        name="phone"
                        hintText="(888) 888-8888"
                        floatingLabelText="Phone"
                        errorText={this.state.validPhone ? null: 'Enter a valid phone number'}
                        onChange={(evt, newValue) => this.validatePhone(newValue)} />
                        <RaisedButton
                          style={{display: 'block',                                   height:'auto !important'}}
                            label={(this.state.firstName && this.state.lastName && this.state.email && this.state.phone && this.state.validEmail && this.state.validPhone) ? 'Schedule' : 'Fill out your information to schedule'}
                            labelPosition="before"
                            primary={true}
                            fullWidth={true}
                            // onClick={() => console.log(this.state.firstName,this.state.lastName,this.state.email,this.state.phone)}
                            onClick={() => this.setState({ confirmationModalOpen: !this.state.confirmationModalOpen })}
                            disabled={(this.state.firstName && this.state.lastName && this.state.email && this.state.phone) === '' ? true : false }
                            //disabled={!contactFormFilled || this.state.processed }
                            
                            //style={{ marginTop: 20, maxWidth: 100}} 
                            />
                    </section>      
                    </StepContent>
                  </Step>
              </Stepper>
            </Card>
                 <Dialog
                    modal={true}
                    open={confirmationModalOpen}
                    actions={modalActions}
                    title="Confirm your appointment">
                    {this.renderAppointmentConfirmation()}
                </Dialog> 
                <SnackBar
                  open={confirmationSnackbarOpen}
                  message={loading ? this.state.confirmationSnackbarMessage : 'Loading... '}
                  autoHideDuration={2000}
                  onRequestClose={() => this.setState({ confirmationSnackbarOpen: false })}
                   />
               </section>
         </div>
        
        )       
    }
}
export default withRouter(Appointment);