import mongoose from 'mongoose';

// Define the interface for TypeScript
export interface IQuizSubmission {
  answers: string[]; // Array of answers
  timestamp: Date;   // Timestamp of submission
  userId?: string;   // Optional user identifier
}

// Create the Mongoose schema
const QuizSubmissionSchema = new mongoose.Schema<IQuizSubmission>({
  answers: {
    type: [String],
    required: true,
    validate: [
      (answers: string[]) => answers.length === 10, // Ensure 10 answers
      'Must have exactly 10 answers',
    ],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: false,
  },
});

// Prevent recompiling the model
export default mongoose.models.QuizSubmission || 
  mongoose.model<IQuizSubmission>('QuizSubmission', QuizSubmissionSchema);
