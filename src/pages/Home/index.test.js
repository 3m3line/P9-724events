import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import Home from "./index";



describe("When Home is created with a Foorm", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    screen.debug();
    await waitFor(() => {
      expect(screen.getByTestId("container-form-testId")).toBeInTheDocument();
    });
    
    await waitFor(() => {
      screen.findByText("Nom");
      screen.findByText("Prénom");
      screen.findByText("Personel / Entreprise");
      screen.findByText("Email");
    });
  });

  describe("and the form on the Home page is submitted", () => {
    it("displays 'En cours', shows success message, and updates the button text", async () => {

      render(<Home />);
      screen.debug(); 

      // Remplir les champs du formulaire
      const fields = await screen.queryAllByTestId("field-testid");
      fields.forEach(field => {
        fireEvent.change(field, { target: { value: 'Test' } });
      });

      // Simuler la sélection dans le composant Select
      const form = await screen.getByTestId("container-form-testId");
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
  it("a list of events is displayed", async () => {
    render(<Home />);

    await waitFor(() => {
      //vérifie l' apparition du titre puis du filtre et des cartes événements
      expect(screen.getByTestId("realisation-title")).toBeInTheDocument();
    });
    await screen.queryAllByTestId("select-testid");
    await screen.queryAllByTestId("card-testid");
    
  });
  it("a list a people is displayed", async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId("equipe-title")).toBeInTheDocument();
    });

    // Vérifie que les cartes des membres de l'équipe sont rendues
    const peopleCards = screen.getAllByTestId("people-card");
    expect(peopleCards.length).toBeGreaterThan(0);
  })
  it("a footer is displayed", async () => {
    render(<Home />);

    // Vérifie que le pied de page est affiché avec le titre de la partie ou un element du contenu
    await waitFor(() => {
      expect(screen.getByText("Notre derniére prestation")).toBeInTheDocument();
      expect(screen.getByText("Contactez-nous")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText((content, element) => 
        element.tagName.toLowerCase() === 'p' && content.includes("Une agence événementielle propose")
      )).toBeInTheDocument();
    });
  })
  it("an event card, with the last event, is displayed", async () => {
    render(<Home />);

    // Vérifie que la carte de l'événement le plus récent est affichée
    const lastEvent = screen.queryByTestId("last-event-card"); // Assurez-vous que `EventCard` a `data-testid="event-card"`
    
    if (lastEvent) {
      await waitFor(() => {
        expect(screen.getByText("Notre derniére prestation")).toBeInTheDocument();
        expect(lastEvent).toBeInTheDocument();
      });
    } else {
      await waitFor(() => {
        expect(screen.getByText("Aucune prestation disponible pour le moment.")).toBeInTheDocument();
      });
    }
  })
});
