import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SelectFile from "./SelectFile";
import { useLanguage } from "../context/LanguageContext";

const setLoading = vi.fn();
const setIsOpen = vi.fn();
const setError = vi.fn();

// Mock useLanguage hook
vi.mock("../context/LanguageContext", () => ({
  useLanguage: vi.fn(),
}));

useLanguage.mockReturnValue({
  setText: vi.fn(),
});

describe("Select File", () => {
  it("allows user upload for files with more than 10 words", () => {
    render(
      <SelectFile
        setLoading={setLoading}
        setIsOpen={setIsOpen}
        setError={setError}
      />,
    );

    // Create a text file with more than 10 words named Lost_Kitten.txt
    const fileContent =
      "Title: The Lost Kitten \n Once upon a time, in a small village nestled between rolling green hills, there lived a little girl named Lily. Lily had always wanted a pet, so one sunny afternoon, she decided to take a walk through the meadow to see if she could find one. \n As she wandered, she heard a faint meowing coming from behind a bush. Curious, she approached and discovered a tiny, trembling kitten. Its fur was matted and dirty, and it looked very scared. \n Lily gently picked up the kitten and cradled it in her arms.";

    const file = new File([fileContent], "Lost_Kitten.txt", {
      type: "text/plain",
    });

    // Get the UI elements for the submission box and submit button
    const input = screen.getByLabelText(
      "Upload the File You Want to Translate",
    );
    const submitButton = screen.getByText("Submit");

    //user uploads the file and submits
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(submitButton);

    //the filename should be displayed
    expect(screen.getByText("Lost_Kitten.txt")).toBeInTheDocument();
    expect(setLoading).toHaveBeenCalledWith(true);
  });

  it("allows user upload for files with supported language", () => {
    render(
      <SelectFile
        setLoading={setLoading}
        setIsOpen={setIsOpen}
        setError={setError}
      />,
    );

    // Create a text file with more than 10 words in French named Le_Chat.txt
    const fileContent =
      "Il était une fois, dans un petit village en France, un chat du nom de Pierre. Pierre était un félin fier et rusé, connu pour sa vivacité et son agilité. Chaque jour, il parcourait les ruelles pavées à la recherche de quelque chose à chasser. Mais un jour, alors qu'il se promenait près d'une vieille grange, il entendit un faible grincement. Intrigué, il s'approcha et découvrit une petite souris piégée sous une poutre.";

    const file = new File([fileContent], "Le_Chat.txt", {
      type: "text/plain",
    });

    // Get the UI elements for the submission box and submit button
    const input = screen.getByLabelText(
      "Upload the File You Want to Translate",
    );
    const submitButton = screen.getByText("Submit");

    //user uploads the file and submits
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(submitButton);

    //the filename should be displayed
    expect(screen.getByText("Le_Chat.txt")).toBeInTheDocument();
    expect(setLoading).toHaveBeenCalledWith(true);
  });
});
