import { KINSHASA_COMMUNES } from '@spiro/shared';

export function CommuneSelect({ required = false }: { required?: boolean }) {
  return (
    <div className="field">
      <label htmlFor="commune">Commune</label>
      <select id="commune" name="commune" required={required} defaultValue="">
        <option value="" disabled={required}>
          {required ? 'Choisissez votre commune' : 'Commune (facultatif)'}
        </option>
        {KINSHASA_COMMUNES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
