import { PHONE_PREFIX } from '@spiro/shared';

export function PhoneField({ id = 'phone' }: { id?: string }) {
  return (
    <div className="field">
      <label htmlFor={id}>Téléphone</label>
      <div className="phone-input">
        <span>{PHONE_PREFIX}</span>
        <input id={id} name="phone" type="tel" inputMode="tel" placeholder="812 345 678" autoComplete="tel-national" required />
      </div>
    </div>
  );
}
