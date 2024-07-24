import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("displays the form fields correctly", async () => {
    render(<Form />);
    
    // Vérifiez que les labels des champs sont présents
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and the form is submitted", () => {
    it("displays 'En cours', shows success message, and updates the button text", async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();
      render(<Form onSuccess={onSuccess} onError={onError} />);

      // Remplir les champs du formulaire
      const fields = await screen.queryAllByTestId("field-testid");
      fields.forEach(field => {
        fireEvent.change(field, { target: { value: 'Test' } });
      });
      
      // Simuler la sélection dans le composant Select
      const form = screen.getByTestId("form-testid");
      fireEvent.click(within(form).getByTestId("collapse-button-testid"));
      fireEvent.click(screen.getByText('Personel'));


      // Soumettre le formulaire
      await fireEvent.click(within(form).getByTestId("button-test-id"));

      // Vérifiez que le texte "En cours" est affiché immédiatement après la soumission
      await waitFor(() => {
        expect(screen.getByText("En cours")).toBeInTheDocument();
      });

      // Vérifiez que la fonction onSuccess a été appelée
      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled();
      });

      // Vérifiez que la fonction onError n'a pas été appelée
      await waitFor(() => {
        expect(onError).not.toHaveBeenCalled();
      });

      // Vérifiez que la modale de succès est affichée (assumant que vous avez un texte ou un élément de modale spécifique)
      await waitFor(() => {
        expect(screen.getByText("Message envoyé !")).toBeInTheDocument();
      });

      // Vérifiez que le bouton texte est revenu à "Envoyer" après la modale de succès
      await waitFor(() => {
        expect(screen.getByText("Envoyer")).toBeInTheDocument();
      });

    });
  });
});


