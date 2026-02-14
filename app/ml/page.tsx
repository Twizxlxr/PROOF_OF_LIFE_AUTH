import type { Metadata } from "next";
import MLModelsPage from "@/components/ml/MLModelsPage";

export const metadata: Metadata = {
  title: "ML Pipeline — Proof-of-Life Authentication",
  description:
    "Deep dive into the three neural networks powering proof-of-life verification: MediaPipe FaceMesh, DeepFace VGG-Face, and MesoNet-4 deepfake detector.",
};

export default function Page() {
  return <MLModelsPage />;
}
