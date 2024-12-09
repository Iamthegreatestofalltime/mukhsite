import connectMongoDB from '../../lib/mongodb';
import QuizSubmission from '../../lib/models/QuizSubmission';

export async function POST(req) {
  console.log("Received a POST request");

  try {
    const body = await req.json(); // Parse the JSON body
    const { answers, userId } = body;

    console.log("Received Data:", { answers, userId });

    // Validate and transform the input
    if (!answers || typeof answers !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid answers format' }), {
        status: 400,
      });
    }

    // Transform the `answers` object into an array of strings
    const transformedAnswers = Object.keys(answers).map((key) => {
      const value = answers[key];
      return Array.isArray(value) ? value.join(", ") : value; // Convert arrays to comma-separated strings
    });

    if (transformedAnswers.length !== 10) {
      return new Response(JSON.stringify({ error: 'Must have exactly 10 answers' }), {
        status: 400,
      });
    }

    console.log("Transformed Answers:", transformedAnswers);

    console.log("Connecting to MongoDB...");
    await connectMongoDB();

    console.log("Connected to MongoDB. Saving data...");
    const submission = await QuizSubmission.create({
      answers: transformedAnswers,
      timestamp: new Date(),
      userId: userId || null,
    });

    console.log("Data saved:", submission);

    return new Response(
      JSON.stringify({ message: 'Quiz submitted successfully', submissionId: submission._id }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error handling request:", error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
    });
  }
}