import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    type: '',
    message: ''
  });
  const [error, setError] = useState('');
  const [selectKey, setSelectKey] = useState(Date.now());

  const validateForm = () => {
    let isValid = true;
    let errorMessage = '';

    // Check chaque field pour les erreurs
    if (!formData.nom) {
      errorMessage = 'Nom ; ';
      isValid = false;
    }
    if (!formData.prenom) {
      errorMessage += 'Prénom ; ';
      isValid = false;
    }
    if (!formData.email) {
      errorMessage += 'Email ; ';
      isValid = false;
    }
    if (!formData.type) {
      errorMessage += 'Type : Personel / Entreprise ; ';
      isValid = false;
    }
    if (!formData.message) {
      errorMessage += 'Message ; ';
      isValid = false;
    }

    setError(errorMessage.trim());
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      type: value
    }));
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      if (!validateForm()) return;

      setSending(true);
      try {
        await mockContactApi();
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          type: '',
          message: ''
        });
        setError('');
        setSending(false);
        setSelectKey(Date.now()); 
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
      setSending(false);
    },
    [formData, onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact} data-testid="form-testid">
      <div className="row">
        <div className="col">
          <Field
            name="nom"
            placeholder=""
            label="Nom"
            value={formData.nom}
            onChange={handleChange}
          />
          <Field
            name="prenom"
            placeholder=""
            label="Prénom"
            value={formData.prenom}
            onChange={handleChange}
          />
          <Select
            key={selectKey}
            selection={["Personel", "Entreprise"]}
            onChange={handleSelectChange}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
            value={formData.type}
          />
          <Field
            name="email"
            placeholder=""
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            name="message"
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={formData.message}
            onChange={handleChange}
          />
        </div>
      </div>
      {error && <div className="error-general">Merci de remplir les champs suivant pour envoyer le formulaire : {error}</div>}
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;

