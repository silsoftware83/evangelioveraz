

export type AlertType = 'success' | 'danger' | 'warning' | 'info';

export interface AlertProps {
  type?: AlertType;
  title?: string;
  message?: string;
  duration?: number;
}

let showAlertFn: (props: AlertProps) => void = () => {};

export const setShowAlertFn = (fn: (props: AlertProps) => void) => {
  showAlertFn = fn;
};

export const showAlert = (props: AlertProps) => {
  showAlertFn(props);
};