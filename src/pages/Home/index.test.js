import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import Home from "./index";

describe("When Home is created with a Foorm", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and the form on the Home page is submitted", () => {
    it("displays 'En cours', shows success message, and updates the button text", async () => {

      render(<Home />);

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

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // to implement
  })
  it("a list a people is displayed", () => {
    // to implement
  })
  it("a footer is displayed", () => {
    // to implement
  })
  it("an event card, with the last event, is displayed", () => {
    // to implement
  })
});
