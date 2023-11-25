// import { initializeAgentExecutorWithOptions } from "langchain/agents";
// import { ChatOpenAI } from "langchain/chat_models/openai";
// import { SerpAPI } from "langchain/tools";
// import { Calculator } from "langchain/tools/calculator";
import dotenv from 'dotenv';
dotenv.config();

// const tools = [new Calculator(), new SerpAPI()];
// const chat = new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 });

// const executor = await initializeAgentExecutorWithOptions(tools, chat, {
//   agentType: "openai-functions",
//   verbose: true,
// });

// const result = await executor.invoke({
//   input: "How many Flutter developer jobs are there in India for a fresher?",
// });
// console.log(result);

import { OpenAI } from "langchain/llms/openai";
import { ZapierNLAWrapper } from "langchain/tools";
import {
  initializeAgentExecutorWithOptions,
  ZapierToolKit,
} from "langchain/agents";

const model = new OpenAI({ temperature: 0 });
const zapier = new ZapierNLAWrapper();
const toolkit = await ZapierToolKit.fromZapierNLAWrapper(zapier);

const executor = await initializeAgentExecutorWithOptions(
  toolkit.tools,
  model,
  {
    agentType: "zero-shot-react-description",
    verbose: true,
  }
);
console.log("Loaded agent.");

const input = "Summarize the last email I received regarding Silicon Valley Bank. Send the summary by drafting an email to the dev.parthdasawant@gmail.com";

console.log(`Executing with input "${input}"...`);

const result = await executor.invoke({ input });

console.log(`Got output ${result.output}`);