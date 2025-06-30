const openai = require("../../config/openai");
const { handlers } = require("../../utilities/handlers/handlers");
const fs = require("fs").promises;
const path = require("path");

class Service {
  async diagnoseHypertension(req, res) {
    const {
      age,
      gender,
      bloodPressure,
      cholesterol,
      chestPain,
      diabetes,
      electrocardiogramVariation,
    } = req.user;

    // Load the prompt template
    const filePath = path.join(__dirname, "../../prompts/hypertension.txt");
    const promptTemplate = await fs.readFile(filePath, "utf8");

    // Replace placeholders in the prompt
    const prompt = promptTemplate
      .replace("{{age}}", age)
      .replace("{{gender}}", gender)
      .replace("{{bp_result}}", `${bloodPressure} mmHg`)
      .replace("{{chol_result}}", `${cholesterol} mg/dL`)
      .replace("{{cp_result}}", chestPain)
      .replace("{{diab_result}}", diabetes)
      .replace("{{ecg_result}}", electrocardiogramVariation);

    // Send prompt to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_completion_tokens: 300,
    });

    const result = response.choices[0].message.content;
    console.log(JSON.parse(result));
    return handlers.response.success({ res, data: result });
  }

  async proceedWithDiagnose(req, res) {
    try {
      await this.diagnoseHypertension(req, res);
    } catch (error) {
      console.error(error);

      return handlers.response.error({ res, message: error });
    }
  }
}

module.exports = new Service();
