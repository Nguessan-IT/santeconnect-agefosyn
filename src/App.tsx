import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Landing from "@/pages/Landing";
import Auth from "@/pages/Auth";
import PatientDashboard from "@/pages/patient/Dashboard";
import PatientAppointments from "@/pages/patient/Appointments";
import PatientMedicalRecord from "@/pages/patient/MedicalRecord";
import PatientMessages from "@/pages/patient/Messages";
import PatientTeleconsultation from "@/pages/patient/Teleconsultation";
import PatientPharmacy from "@/pages/patient/Pharmacy";
import DoctorDashboard from "@/pages/doctor/Dashboard";
import DoctorPatients from "@/pages/doctor/Patients";
import DoctorPrescriptions from "@/pages/doctor/Prescriptions";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminHospitals from "@/pages/admin/Hospitals";
import AdminAnalytics from "@/pages/admin/Analytics";
import AdminReports from "@/pages/admin/Reports";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        {/* Patient routes */}
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient/appointments" element={<PatientAppointments />} />
        <Route path="/patient/medical-record" element={<PatientMedicalRecord />} />
        <Route path="/patient/messages" element={<PatientMessages />} />
        <Route path="/patient/teleconsultation" element={<PatientTeleconsultation />} />
        <Route path="/patient/pharmacy" element={<PatientPharmacy />} />
        {/* Doctor routes */}
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/doctor/patients" element={<DoctorPatients />} />
        <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />
        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/hospitals" element={<AdminHospitals />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
