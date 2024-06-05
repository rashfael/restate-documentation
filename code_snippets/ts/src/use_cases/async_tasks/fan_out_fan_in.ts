import * as restate from "@restatedev/restate-sdk";
import { Context, CombineablePromise } from "@restatedev/restate-sdk";

// <start_here>
const workerService = restate.service({
    name: "worker",
    handlers: {
        run: async (ctx: Context, task: Task) => {
            // Split the task in subtasks
            const subtasks: SubTask[] = await ctx.run("split task",
                () => split(task));

            const resultPromises = [];
            for (const subtask of subtasks) {
                const subResultPromise = ctx.serviceClient(workerService)
                    .runSubtask(subtask);
                resultPromises.push(subResultPromise);
            }

            const results = await CombineablePromise.all(resultPromises);
            return aggregate(results);
        },

        runSubtask: async (ctx: Context, subtask: SubTask) => {
            // Processing logic goes here ...
            // Can be moved to a separate service to scale independently
        }
    }
});

export const handler = restate.endpoint().bind(workerService).lambdaHandler();

// <end_here>

// ----------------------- Stubs to please the compiler -----------------------

type Task = {}
type Result = {}

type SubTask = { }
type SubTaskResult = void

async function split(task: Task): Promise<SubTask[]> {
    return [];
}

async function aggregate(packages: SubTaskResult[]): Promise<Result> {
    return {};
}