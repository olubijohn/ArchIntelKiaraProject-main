export interface IAppointment {
  initialValues: IAppointment;
  AppointmentDate: string;
  AppointmentTime: string;
  AppointmentType: string;
  AppointmentApplicant: string;
  Applicant: IApplicant;
}

export interface IApplicant {
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Gender: string;
  Email: string;
  DateOfBirth: string;
  StreetAddress: string;
  City: string;
  PostalCode: string;
}
