
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface Option {
  id: string;
  label: string;
  value: number;
}

const options: Option[] = [
  { id: "a6-at-spos", label: "A.6 AT s/pós", value: 25.0 },
  { id: "a6-at-cpos", label: "A.6 AT c/pós", value: 28.5 },
  { id: "a6-psico-p", label: "A.6 Psico P", value: 29.0 },
  { id: "d6-at-spos", label: "D.6 AT s/pós", value: 27.0 },
  { id: "d6-at-cpos", label: "D.6 AT c/pós", value: 31.5 },
  { id: "d6-psico-p", label: "D.6 Psico P", value: 37.0 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export default function Calculator() {
  const [selectedOption, setSelectedOption] = useState<string>(options[0].id);
  const [weeklyHours, setWeeklyHours] = useState<number>(15);
  const [weeks, setWeeks] = useState<number>(4);
  const [total, setTotal] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    setIsCalculating(true);
    const selectedValue = options.find((opt) => opt.id === selectedOption)?.value || 0;
    const newTotal = selectedValue * weeklyHours * weeks;
    
    setTimeout(() => {
      setTotal(newTotal);
      setIsCalculating(false);
      toast.success("Cálculo realizado com sucesso!");
    }, 300);
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6 flex flex-col items-center justify-start bg-primary animate-fade-in">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="secondary" className="animate-fade-in">
            Calculadora
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Calculadora de Tabela
          </h1>
        </div>

        <Card className="p-6 glass-effect calculator-shadow animate-slide-up">
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-sm font-medium">Selecione uma opção:</Label>
              <RadioGroup
                value={selectedOption}
                onValueChange={setSelectedOption}
                className="grid gap-3"
              >
                {options.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-white/50 animate-hover hover:bg-white/70"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                    <span className="text-sm font-medium">
                      {formatCurrency(option.value)}
                    </span>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="weeklyHours">Horas Semanais</Label>
                <Input
                  id="weeklyHours"
                  type="number"
                  min="1"
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  className="bg-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weeks">Quantas Semanas</Label>
                <Input
                  id="weeks"
                  type="number"
                  min="1"
                  value={weeks}
                  onChange={(e) => setWeeks(Number(e.target.value))}
                  className="bg-white/50"
                />
              </div>
            </div>

            <Button
              onClick={handleCalculate}
              className="w-full bg-accent hover:bg-accent/90 text-white"
              disabled={isCalculating}
            >
              {isCalculating ? "Calculando..." : "Calcular Total"}
            </Button>

            {total > 0 && (
              <div className="text-center space-y-2 animate-fade-in">
                <Label className="block text-sm">Total:</Label>
                <span className="block text-2xl font-bold text-gray-900">
                  {formatCurrency(total)}
                </span>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
