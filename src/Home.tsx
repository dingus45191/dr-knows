import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert, ProgressBar } from "react-bootstrap";
//@ts-ignore
import * as ml5 from "ml5";
import Knows from "./knows.png";

interface Ml5Result {
  label: string;
  confidence: number;
}

const Home: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [results, setResults] = useState<Ml5Result[]>([]);
  const [file, setFile] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [modelProgress, setModelProgress] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [modelReady, setModelReady] = useState<boolean>(false);
  const [classifier, setClassifier] = useState<any>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (loading && !modelReady) {
      const interval = setInterval(() => {
        setModelProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 500);
      return () => clearInterval(interval);
    } else if (modelReady) {
      setModelProgress(100);
    }
  }, [loading, modelReady]);

  useEffect(() => {
    setLoading(true);
    setError("");
    setModelProgress(0);
    console.log("Attempting to load MobileNet model...");
    ml5.imageClassifier("MobileNet")
      .then((cls: any) => {
        setClassifier(cls);
        setModelReady(true);
        setLoading(false);
        console.log("MobileNet model loaded successfully");
      })
      .catch((err: any) => {
        setError(`Error: Failed to load model: ${err.message}`);
        setLoading(false);
        console.error("Classifier error:", err);
      });

    return () => {
      setLoading(false);
      setModelReady(false);
    };
  }, []);

  const classifyImg = () => {
    if (!imageRef.current || !classifier) {
      setError("Error: Image or model not ready. Please upload an image and retry.");
      console.error("Classification failed: Image or classifier missing");
      return;
    }

    // Validate image dimensions
    const { naturalWidth, naturalHeight } = imageRef.current;
    if (naturalWidth === 0 || naturalHeight === 0) {
      setError("Error: Image failed to load or has invalid dimensions. Please try another image.");
      console.error("Invalid image dimensions:", naturalWidth, "x", naturalHeight);
      return;
    }

    setLoading(true);
    setError("");
    console.log("Classifying image...");
    classifier.predict(imageRef.current, 5, (err: any, results: Ml5Result[]) => {
      setLoading(false);
      if (err) {
        setError(`Error: ${err.message}`);
        console.error("Prediction error:", err);
        return;
      }
      const sortedResults = (results || []).sort((a, b) => b.confidence - a.confidence);
      setResults(sortedResults);
      console.log("Predictions:", sortedResults);
      if (sortedResults.length === 0) {
        setError("Error: No predictions found. Try a different image.");
      }
    });
  };

  useEffect(() => {
    if (file && imageRef.current && modelReady && imageLoaded) {
      console.log("Triggering classification for new image");
      classifyImg();
    }
  }, [file, modelReady, imageLoaded]);

  const handleFileSelect = (selectedFile: File) => {
    setError("");
    setImageLoaded(false); // Reset image loaded state
    if (!selectedFile.type.startsWith("image/")) {
      setError("Error: Please upload a valid image (PNG/JPEG).");
      console.error("Invalid file type:", selectedFile.type);
      return;
    }
    setFile(selectedFile.name);
    if (imageRef.current) {
      imageRef.current.title = selectedFile.name;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (imageRef.current && event.target) {
          imageRef.current.src = event.target.result as string;
          console.log("Image loaded:", selectedFile.name);
          // Set onload handler to confirm image is ready
          imageRef.current.onload = () => {
            setImageLoaded(true);
            console.log("Image fully loaded, dimensions:", imageRef.current?.naturalWidth, "x", imageRef.current?.naturalHeight);
          };
          imageRef.current.onerror = () => {
            setError("Error: Failed to load image.");
            console.error("Image load error:", selectedFile.name);
            setImageLoaded(false);
          };
        }
      };
      reader.onerror = () => {
        setError("Error: Failed to read file.");
        console.error("File read error:", selectedFile.name);
        setImageLoaded(false);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const fileSelectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log("File selected:", selectedFile.name);
      handleFileSelect(selectedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add("drop-zone-drag-over");
    }
  };

  const handleDragLeave = () => {
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("drop-zone-drag-over");
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("drop-zone-drag-over");
    }
    const selectedFile = event.dataTransfer.files[0];
    if (selectedFile) {
      console.log("File dropped:", selectedFile.name);
      handleFileSelect(selectedFile);
    }
  };

  const reset = () => {
    setFile(undefined);
    setResults([]);
    setError("");
    setImageLoaded(false);
    if (imageRef.current) {
      imageRef.current.src = "";
      imageRef.current.title = "";
    }
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    console.log("Reset complete");
  };

  return (
    <Container className="main-content">
      <Row className="justify-content-center text-center">
        <Col xs={12} md={10} lg={8}>
          <h1 className="app__title mt-4 mb-3">Dr. Knows</h1>
          <img src={Knows} alt="Knows" className="app__image img-fluid mb-4" />
          <p className="app__intro lead mb-4">
            Dr. Knows uses AI to classify images, identifying objects like martial arts equipment and more.
          </p>
          <h2 className="app__problem mb-3">Curious about an image? Let us classify it!</h2>
          <p className="app__desc mb-4">
            Upload or drag-and-drop a clear, well-lit image for accurate results.
          </p>
          <h3 className="app__start mb-4">Get Started Now</h3>
          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}
          {!modelReady && loading && (
            <div className="mb-3">
              <ProgressBar now={modelProgress} label={`${modelProgress}%`} animated />
              <p>Loading MobileNet model...</p>
            </div>
          )}
          <Card className="app__classify shadow-sm">
            <Card.Body>
              <div
                ref={dropZoneRef}
                className="drop-zone mb-3"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <img ref={imageRef} id="image" alt="" className="img-fluid mb-3" />
                {!file && <p className="drop-zone-text">Drag & Drop Image Here or Click Below</p>}
                <label className="file">
                  <input
                    ref={fileRef}
                    type="file"
                    id="file"
                    accept="image/*"
                    aria-label="File browser example"
                    onChange={fileSelectHandler}
                    className="app__picker"
                    disabled={loading}
                  />
                  <Button as="span" variant="primary" className="file-custom" disabled={loading}>
                    {file ? "Change Image" : "Choose Image"}
                  </Button>
                </label>
              </div>
              {loading && modelReady && (
                <div className="text-center mb-3">
                  <Spinner animation="border" variant="primary" />
                  <p>Classifying image...</p>
                </div>
              )}
              {results.length > 0 && (
                <div className="results mt-3">
                  <h4>Predictions:</h4>
                  {results.map(({ label, confidence }, index) => (
                    <p key={index} className={`result-item ${index === 0 ? "result-top" : ""}`}>
                      {label}: <strong>{(confidence * 100).toFixed(2)}%</strong>
                    </p>
                  ))}
                  <Button variant="outline-secondary" onClick={reset} className="mt-3 me-2">
                    Reset
                  </Button>
                  <Button variant="outline-primary" onClick={classifyImg} className="mt-3" disabled={loading}>
                    Retry Classification
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;