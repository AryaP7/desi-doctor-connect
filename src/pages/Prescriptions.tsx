import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ArrowLeft, Download, Upload, QrCode, FileText, Save, Loader2, Trash } from 'lucide-react';
import Tesseract from 'tesseract.js';

type SavedPrescription = {
  id: string;
  createdAt: number;
  fileName: string;
  text: string;
};

const STORAGE_KEY = 'prescriptions';

export default function Prescriptions() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [ocrText, setOcrText] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [saved, setSaved] = useState<SavedPrescription[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, []);

  const handleOpenPicker = () => fileInputRef.current?.click();

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setOcrText('');
    setIsScanning(true);
    try {
      const result = await Tesseract.recognize(url, 'eng', {
        logger: () => {},
      });
      setOcrText(result.data.text.trim());
    } catch (err) {
      setOcrText('');
    } finally {
      setIsScanning(false);
    }
  };

  const handleSave = () => {
    if (!ocrText) return;
    const entry: SavedPrescription = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      fileName: fileName || 'scan',
      text: ocrText,
    };
    const next = [entry, ...saved].slice(0, 50);
    setSaved(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const handleDelete = (id: string) => {
    const next = saved.filter(p => p.id !== id);
    setSaved(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/home')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">ArogyaSeva</span>
          </div>
          <LanguageToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container px-4 py-8 max-w-3xl mx-auto">
        <Card className="shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">{t('prescription.title')}</CardTitle>
            <CardDescription>Manage and view your prescriptions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleOpenPicker} variant="outline" className="h-24 flex-col gap-2">
                <Upload className="h-8 w-8" />
                <span className="text-sm">Upload Image</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <Download className="h-8 w-8" />
                <span className="text-sm">Download</span>
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <QrCode className="h-8 w-8" />
                <span className="text-sm">Generate QR</span>
              </Button>
              <Button onClick={handleOpenPicker} variant="outline" className="h-24 flex-col gap-2">
                <FileText className="h-8 w-8" />
                <span className="text-sm">Scan Image</span>
              </Button>
            </div>

            {imageUrl && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border overflow-hidden bg-card">
                  <img src={imageUrl} alt={fileName} className="w-full h-auto object-contain max-h-96" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">Extracted Text</h4>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="secondary" onClick={handleSave} disabled={!ocrText || isScanning}>
                        {isScanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        <span className="ml-2">Save</span>
                      </Button>
                    </div>
                  </div>
                  <textarea
                    className="w-full min-h-60 rounded-md border border-input bg-background p-3 text-sm"
                    value={isScanning ? 'Scanning…' : ocrText}
                    onChange={(e) => setOcrText(e.target.value)}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Prescriptions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Prescriptions</h3>
          {saved.length === 0 ? (
            <Card>
              <CardContent className="p-4">
                <p className="text-center text-muted-foreground py-8">
                  No prescriptions available
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {saved.map((p) => (
                <Card key={p.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">{new Date(p.createdAt).toLocaleString()}</div>
                        <div className="font-medium text-foreground">{p.fileName}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(p.text)}>Copy</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <pre className="mt-3 whitespace-pre-wrap text-sm text-foreground/90">{p.text}</pre>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
