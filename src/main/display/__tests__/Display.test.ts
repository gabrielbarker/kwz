import Display from "../Display";
import MultipleChoiceQuestion from "../../questions/MultipleChoiceQuestion";

jest.mock("../../questions/MultipleChoiceQuestion");

const mockLog = jest.fn();

beforeEach(() => {
  console.log = mockLog;
});

const statement: string = "statement";
const correctAnswer = "Correct Answer";
const options = {
  A: correctAnswer,
  B: "Option B",
  C: "Option C",
  D: "Option D",
};
const correct = "Correct!";
const incorrect = `Wrong! The correct answer is "${Object.values(options)[0]}"`;

const mockQuestion = (isCorrect: boolean) => {
  (MultipleChoiceQuestion as jest.Mock).mockImplementation(() => ({
    statement: statement,
    options: options,
    answer: Object.keys(options)[0],
    isCorrect: jest.fn(() => isCorrect),
  }));
};

const getMockQuestion = () =>
  new MultipleChoiceQuestion(statement, options["A"], Object.values(options));

describe("Display", () => {
  it("'printQuestion' prints correct string", async () => {
    // Given
    mockQuestion(true);
    const display = new Display();
    const mockQuestionInstance = getMockQuestion();
    // When
    display.printQuestion(mockQuestionInstance);
    // Then
    expect(mockLog).toBeCalledWith(statement);
    Object.entries(options).forEach((v) => expect(mockLog).toBeCalledWith(`${v[0]}: ${v[1]}`));
  });

  it("'printResponse' prints correct string when correct", async () => {
    // Given
    const display = new Display();
    // When
    display.printResponse(true, correctAnswer);
    // Then
    expect(mockLog).toBeCalledWith(correct);
  });

  it("'printResponse' prints correct string when incorrect", async () => {
    // Given
    const display = new Display();
    // When
    display.printResponse(false, correctAnswer);
    // Then
    expect(mockLog).toBeCalledWith(incorrect);
  });

  it("'printScore' prints correct string", async () => {
    // Given
    const display = new Display();
    const score = 1,
      total = 2;
    // When
    display.printScore(score, total);
    // Then
    expect(mockLog).toBeCalledWith(`Score: ${score}/${total}`);
  });

  it("'printCategory' prints correct string", async () => {
    // Given
    const display = new Display();
    const id = 1,
      name = "name";
    // When
    display.printCategory(name, id);
    // Then
    expect(mockLog).toBeCalledWith(`${name} - ${id}`);
  });

  it("'printInvalidOption' prints correct string", async () => {
    // Given
    const display = new Display();
    const options = ["A", "B", "C"];
    // When
    display.printInvalidOption(options);
    // Then
    const expected = `Invalid option! Enter ${options[0]}, ${options[1]} or ${options[2]}...`;
    expect(mockLog).toBeCalledWith(expected);
  });
});
