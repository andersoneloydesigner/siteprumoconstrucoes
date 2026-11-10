sed -i 's/--color-brand-accent: #D4AF37;/--color-brand-accent: #878787;/g' src/index.css

cat << 'INNER_EOF' >> src/index.css

@utility text-gold {
  background: 
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      rgba(255,255,255,0.1) 2px,
      rgba(255,255,255,0.1) 4px
    ),
    linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%);
  background-size: 100% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

@utility bg-gold {
  background: 
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      rgba(255,255,255,0.1) 2px,
      rgba(255,255,255,0.1) 4px
    ),
    linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%);
  background-size: 100% 100%;
  color: #0a0a0a !important;
}
INNER_EOF
