export enum UnitKey {
    'Celsius' = 'C',
    'Fahrenheit' = 'F'
}

export enum UnitValue {
    'Metric' = 'metric',
    'Imperial' = 'imperial'
}

export interface UnitInterface {
	key: UnitKey,
	value: UnitValue;
}

export class MetricUnit implements UnitInterface {
    key: UnitKey = UnitKey.Celsius;
    value: UnitValue = UnitValue.Metric;
}

export class ImperialUnit implements UnitInterface {
    key: UnitKey = UnitKey.Fahrenheit;
    value: UnitValue = UnitValue.Imperial;
}
