import RegistrationCarousel from "./RegistrationCarousel";
import RegistrationForm from "./RegistrationForm";

export default function RegistrationPage() {
  return (
    <div className="registrationWrapper">
      <RegistrationForm />
      <div className="registrationWrapper-verticalLine"/>
      <RegistrationCarousel />
    </div>
  );
}
